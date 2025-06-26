"use client"

import { useState, useEffect } from "react"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { LandingPage } from "./components/pages/LandingPage"
import { VirtualDiagnosisPage } from "./components/pages/VirtualDiagnosisPage"
import { BatteryPredictionPage } from "./components/pages/BatteryPredictionPage"
import { SparesHunterPage } from "./components/pages/SparesHunterPage"
import { OBDInfoPage } from "./components/pages/OBDInfoPage"
import { GarageSolutionsPage } from "./components/pages/GarageSolutionsPage"
import { CommunityPage } from "./components/pages/CommunityPage"
import { AuthPage } from "./components/pages/AuthPage"
import { AboutPage } from "./components/pages/AboutPage"
import { LanguageProvider } from "./contexts/LanguageContext"
import { AuthProvider } from "./contexts/AuthContext"
import { CommunityProvider } from "./contexts/CommunityContext"
import { AppView } from "./types"
import { DashboardPage } from "./components/pages/DashboardPage"
import { AdminPage } from "./components/pages/AdminPage"

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING)
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const handleNavigate = (view: AppView) => {
    setCurrentView(view)
    window.scrollTo(0, 0)
  }

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case AppView.LANDING:
        return <LandingPage onNavigate={handleNavigate} />
      case AppView.VIRTUAL_DIAGNOSIS:
        return <VirtualDiagnosisPage />
      case AppView.BATTERY_PREDICTION:
        return <BatteryPredictionPage />
      case AppView.SPARES_HUNTER:
        return <SparesHunterPage />
      case AppView.OBD_INFO:
        return <OBDInfoPage />
      case AppView.GARAGE_SOLUTIONS:
        return <GarageSolutionsPage />
      case AppView.COMMUNITY:
        return <CommunityPage />
      case AppView.AUTH:
        return <AuthPage />
      case AppView.ABOUT:
        return <AboutPage />
      case AppView.DASHBOARD:
        return <DashboardPage onNavigate={handleNavigate} />
      case AppView.ADMIN:
        return <AdminPage onNavigate={handleNavigate} />
      default:
        return <LandingPage onNavigate={handleNavigate} />
    }
  }

  return (
    <LanguageProvider>
      <AuthProvider>
        <CommunityProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900">
            <Header
              currentView={currentView}
              onNavigate={handleNavigate}
              isDarkMode={isDarkMode}
              onToggleTheme={handleToggleTheme}
            />

            <main>{renderCurrentView()}</main>

            <Footer onNavigate={handleNavigate} />
          </div>
        </CommunityProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App
