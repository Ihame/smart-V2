"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { CommunityPost } from "../types"
import { useAuth } from "./AuthContext"

// Helper: is Supabase configured?
import { supabase } from "../services/supabaseClient"
const SUPABASE_CONFIGURED =
  !supabase.supabaseUrl.includes("your-project.supabase.co") && !supabase.supabaseKey?.includes("your-anon-key")

interface CommunityContextType {
  posts: CommunityPost[]
  addPost: (content: string) => Promise<void>
  fetchPosts: () => Promise<void>
  isLoadingPosts: boolean
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined)

export const useCommunity = () => {
  const context = useContext(CommunityContext)
  if (!context) {
    throw new Error("useCommunity must be used within a CommunityProvider")
  }
  return context
}

interface CommunityProviderProps {
  children: ReactNode
}

export const CommunityProvider: React.FC<CommunityProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(false)
  const { currentUser } = useAuth()

  const fetchPosts = async () => {
    // Skip network request in preview without real creds
    if (!SUPABASE_CONFIGURED) {
      // Show default posts when Supabase is not configured
      const defaultPosts: CommunityPost[] = [
        {
          id: "default-1",
          user_id: "system",
          content:
            "🎉 Welcome to the SmartGarage Community! We're excited to have you join Rwanda's premier automotive technology platform. Share your experiences, get expert advice, and connect with fellow car enthusiasts!",
          author_name: "SmartGarage Team",
          author_email: "team@smartgarage.rw",
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "default-2",
          user_id: "system",
          content:
            "🔋 EV Battery Care Tips: Park in shade when possible, avoid charging to 100% daily (80% is optimal), use smooth acceleration, and get monthly battery health checks. Our AI Battery Prediction service can help optimize your battery's lifespan!",
          author_name: "SmartGarage Team",
          author_email: "team@smartgarage.rw",
          created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "default-3",
          user_id: "system",
          content:
            "🛠️ After analyzing 1000+ hybrid vehicles across East Africa, the most common issues are: Cooling system problems (35%), Battery degradation (28%), Inverter issues (18%). Good news: 80% are preventable with proper maintenance!",
          author_name: "SmartGarage Team",
          author_email: "team@smartgarage.rw",
          created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        },
      ]
      setPosts(defaultPosts)
      return
    }

    setIsLoadingPosts(true)
    try {
      // 1) -- Try joining to profiles (if FK exists)
      let { data, error } = await supabase
        .from("community_posts")
        .select(
          `
            *,
            profiles:profiles (
              full_name,
              email
            )
          `,
        )
        .order("created_at", { ascending: false })

      // 2) -- If the join fails, fall back to simple select *
      if (error && error.message.toLowerCase().includes("could not find a relationship")) {
        const fallback = await supabase.from("community_posts").select("*").order("created_at", { ascending: false })

        data = fallback.data
        error = fallback.error
      }

      if (error) throw error

      const postsWithAuthor = data.map((post: any) => ({
        ...post,
        author_name: post.profiles?.full_name || "Anonymous",
        author_email: post.profiles?.email || "",
      }))

      setPosts(postsWithAuthor)
    } catch (err) {
      console.error("Error fetching posts:", err)
      setPosts([])
    } finally {
      setIsLoadingPosts(false)
    }
  }

  const addPost = async (content: string) => {
    if (!currentUser) throw new Error("Must be logged in to post")

    const { error } = await supabase.from("community_posts").insert([
      {
        user_id: currentUser.id,
        content: content.trim(),
      },
    ])

    if (error) throw error

    // Refresh posts after adding
    await fetchPosts()
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <CommunityContext.Provider
      value={{
        posts,
        addPost,
        fetchPosts,
        isLoadingPosts,
      }}
    >
      {children}
    </CommunityContext.Provider>
  )
}
