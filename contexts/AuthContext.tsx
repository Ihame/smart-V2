"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type AuthState = {
  user: null | { id: string; email: string }
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthState["user"]>(null)

  async function signIn(email: string, _password: string) {
    // TODO: replace with real auth logic
    setUser({ id: crypto.randomUUID(), email })
  }

  function signOut() {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>")
  return ctx
}
