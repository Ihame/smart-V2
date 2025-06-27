"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type SupportedLocale = "en" | "es" | "fr"

interface LanguageState {
  locale: SupportedLocale
  setLocale: (locale: SupportedLocale) => void
}

const LanguageContext = createContext<LanguageState | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<SupportedLocale>("en")

  return <LanguageContext.Provider value={{ locale, setLocale }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within <LanguageProvider>")
  return ctx
}
