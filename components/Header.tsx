"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "./Button"
import { Icon } from "./Icon"
import { useLanguage } from "../contexts/LanguageContext"
import { useAuth } from "../contexts/AuthContext"
import { AppView, AuthStatus } from "../types"

interface HeaderProps {
  currentView: AppView
  onNavigate: (view: AppView) => void
  isDarkMode: boolean
  onToggleTheme: () => void
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, isDarkMode, onToggleTheme }) => {
  const { language, setLanguage, translate } = useLanguage()
  const { authStatus, currentUser, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const navigationItems = [
    { label: translate("nav.virtualDiagnosis"), view: AppView.VIRTUAL_DIAGNOSIS },
    { label: translate("nav.batteryPrediction"), view: AppView.BATTERY_PREDICTION },
    { label: translate("nav.sparesHunter"), view: AppView.SPARES_HUNTER },
    { label: translate("nav.obdInfo"), view: AppView.OBD_INFO },
    { label: translate("nav.garageSolutions"), view: AppView.GARAGE_SOLUTIONS },
    { label: translate("nav.community"), view: AppView.COMMUNITY },
    { label: translate("nav.aboutUs"), view: AppView.ABOUT },
  ]

  const handleLogout = async () => {
    try {
      await logout()
      setIsUserMenuOpen(false)
      onNavigate(AppView.LANDING)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate(AppView.LANDING)}>
            <Icon name="car" size={32} className="text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">SmartGarage</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.view}
                onClick={() => onNavigate(item.view)}
                className={`text-sm font-medium transition-colors ${
                  currentView === item.view
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button variant="ghost" size="sm" onClick={onToggleTheme} className="p-2">
              <Icon name={isDarkMode ? "sun" : "moon"} size={20} />
            </Button>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "rw" : "en")}
              className="p-2"
            >
              <Icon name="globe" size={20} />
              <span className="ml-1 text-xs">{language.toUpperCase()}</span>
            </Button>

            {/* User Menu */}
            {authStatus === AuthStatus.AUTHENTICATED && currentUser ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2"
                >
                  <Icon name="user" size={20} />
                  <span>{currentUser.full_name}</span>
                  <Icon name="chevron-down" size={16} />
                </Button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false)
                        onNavigate(AppView.DASHBOARD)
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                    >
                      <Icon name="home" size={16} className="mr-2 inline" />
                      {translate("nav.dashboard")}
                    </button>
                    {currentUser.is_admin && (
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false)
                          onNavigate(AppView.ADMIN)
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                      >
                        <Icon name="settings" size={16} className="mr-2 inline" />
                        Admin Panel
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false)
                        // Navigate to profile (could be implemented later)
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                    >
                      <Icon name="user" size={16} className="mr-2 inline" />
                      {translate("nav.myProfile")}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                    >
                      <Icon name="logout" size={16} className="mr-2 inline" />
                      {translate("nav.logout")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button onClick={() => onNavigate(AppView.AUTH)} size="sm">
                {translate("nav.login")}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
              <Icon name={isMobileMenuOpen ? "x" : "menu"} size={24} />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
              {navigationItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => {
                    onNavigate(item.view)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`block px-3 py-2 text-base font-medium w-full text-left ${
                    currentView === item.view
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Theme</span>
                  <Button variant="ghost" size="sm" onClick={onToggleTheme} className="p-2">
                    <Icon name={isDarkMode ? "sun" : "moon"} size={20} />
                  </Button>
                </div>

                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Language</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLanguage(language === "en" ? "rw" : "en")}
                    className="p-2"
                  >
                    <Icon name="globe" size={20} />
                    <span className="ml-1 text-xs">{language.toUpperCase()}</span>
                  </Button>
                </div>

                {authStatus === AuthStatus.AUTHENTICATED && currentUser ? (
                  <div className="px-3 py-2">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{currentUser.full_name}</p>
                    <Button onClick={handleLogout} variant="outline" size="sm" className="w-full">
                      {translate("nav.logout")}
                    </Button>
                  </div>
                ) : (
                  <div className="px-3 py-2">
                    <Button
                      onClick={() => {
                        onNavigate(AppView.AUTH)
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full"
                    >
                      {translate("nav.login")}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
