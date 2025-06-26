"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase, getProfile } from "../services/supabaseClient"
import { AuthStatus, type UserProfile } from "../types"

interface AuthContextType {
  authStatus: AuthStatus
  currentUser: UserProfile | null
  supabaseUser: User | null
  login: (email: string, password: string) => Promise<void>
  register: (fullName: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.IDLE)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null)
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null)

  useEffect(() => {
    // Check initial auth state
    const checkAuth = async () => {
      setAuthStatus(AuthStatus.LOADING)
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        setSupabaseUser(user)
        try {
          const profile = await getProfile(user.id)
          setCurrentUser(profile)
          setAuthStatus(AuthStatus.AUTHENTICATED)
        } catch (error) {
          console.error("Error fetching profile:", error)
          setAuthStatus(AuthStatus.UNAUTHENTICATED)
        }
      } else {
        setAuthStatus(AuthStatus.UNAUTHENTICATED)
      }
    }

    checkAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setSupabaseUser(session.user)
        try {
          const profile = await getProfile(session.user.id)
          setCurrentUser(profile)
          setAuthStatus(AuthStatus.AUTHENTICATED)
        } catch (error) {
          console.error("Error fetching profile:", error)
          setAuthStatus(AuthStatus.UNAUTHENTICATED)
        }
      } else {
        setSupabaseUser(null)
        setCurrentUser(null)
        setAuthStatus(AuthStatus.UNAUTHENTICATED)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    setAuthStatus(AuthStatus.LOADING)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setAuthStatus(AuthStatus.UNAUTHENTICATED)
      throw error
    }
  }

  const register = async (fullName: string, email: string, password: string) => {
    setAuthStatus(AuthStatus.LOADING)

    // Save full_name as user-metadata; the DB trigger will copy it to profiles
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    })

    if (error) {
      setAuthStatus(AuthStatus.UNAUTHENTICATED)
      throw error
    }

    // If email confirmation is OFF you'll get a session immediately
    if (data.session?.user) {
      setSupabaseUser(data.session.user)
      setCurrentUser({ id: data.user!.id, full_name: fullName, email })
      setAuthStatus(AuthStatus.AUTHENTICATED)
    } else {
      // Await email verification
      setAuthStatus(AuthStatus.UNAUTHENTICATED)
    }
  }

  const logout = async () => {
    setAuthStatus(AuthStatus.LOADING)
    const { error } = await supabase.auth.signOut()
    if (error) throw error

    setCurrentUser(null)
    setSupabaseUser(null)
    setAuthStatus(AuthStatus.UNAUTHENTICATED)
  }

  return (
    <AuthContext.Provider
      value={{
        authStatus,
        currentUser,
        supabaseUser,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
