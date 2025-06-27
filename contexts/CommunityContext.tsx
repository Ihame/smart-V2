"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface CommunityPost {
  id: string
  author: string
  content: string
  createdAt: Date
}

interface CommunityState {
  posts: CommunityPost[]
  addPost: (content: string) => void
}

const CommunityContext = createContext<CommunityState | undefined>(undefined)

export function CommunityProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<CommunityPost[]>([])

  function addPost(content: string) {
    setPosts((prev) => [...prev, { id: crypto.randomUUID(), author: "anon", content, createdAt: new Date() }])
  }

  return <CommunityContext.Provider value={{ posts, addPost }}>{children}</CommunityContext.Provider>
}

export function useCommunity() {
  const ctx = useContext(CommunityContext)
  if (!ctx) throw new Error("useCommunity must be used within <CommunityProvider>")
  return ctx
}
