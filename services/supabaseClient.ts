import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xnesyneiwgufdipsqdpx.supabase.co"
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuZXN5bmVpd2d1ZmRpcHNxZHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NDQyNzAsImV4cCI6MjA2NjQyMDI3MH0.lGlAcDRmrlAVeWe10FuZdusSprVKWj-EGKiHTcA_0Ks"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database helper functions
export const createProfile = async (userId: string, fullName: string, email: string) => {
  const { data, error } = await supabase.from("profiles").insert([
    {
      id: userId,
      full_name: fullName,
      email: email,
    },
  ])

  if (error) throw error
  return data
}

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) throw error
  return data
}
