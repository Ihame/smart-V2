"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"
import { TRANSLATIONS } from "../constants"

type Language = "en" | "rw"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  translate: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// 🚩 NEW fallback so components don't crash when rendered without a provider
const FALLBACK: LanguageContextType = {
  language: "en",
  setLanguage: () => {
    if (process.env.NODE_ENV !== "production") {
      console.warn("setLanguage was called outside of <LanguageProvider />")
    }
  },
  translate: (key: string) => TRANSLATIONS.en[key] || key,
}

// 🛠️ Replace the old implementation
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  // If the hook is used outside the provider, return the safe fallback
  return context ?? FALLBACK
}

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en")

  const translate = (key: string): string => {
    return TRANSLATIONS[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, translate }}>{children}</LanguageContext.Provider>
}
