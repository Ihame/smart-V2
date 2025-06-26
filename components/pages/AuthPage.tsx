"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../Button"
import { Icon } from "../Icon"
import { useLanguage } from "../../contexts/LanguageContext"
import { useAuth } from "../../contexts/AuthContext"
import { AuthStatus } from "../../types"

export const AuthPage: React.FC = () => {
  const { translate } = useLanguage()
  const { authStatus, login, register } = useAuth()

  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showAdminLogin, setShowAdminLogin] = useState(false)

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleAdminLogin = () => {
    setLoginForm({
      email: "smartgaragerwanda@gmail.com",
      password: "SmartGarage2024!",
    })
    setShowAdminLogin(true)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!loginForm.email || !loginForm.password) {
      setError("Please fill in all fields")
      return
    }

    try {
      await login(loginForm.email.trim(), loginForm.password)
      setSuccess("Login successful! Redirecting...")
      // Small delay to show success message
      setTimeout(() => {
        // Navigation will be handled by the auth context
      }, 1000)
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "Login failed. Please check your credentials and try again.")
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!registerForm.fullName || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setError(translate("auth.passwordMismatch"))
      return
    }

    if (registerForm.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    try {
      await register(registerForm.fullName, registerForm.email, registerForm.password)
      setSuccess("Registration successful! Please check your email to verify your account.")
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.")
    }
  }

  const isLoading = authStatus === AuthStatus.LOADING

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Icon name="car" size={32} className="text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">SmartGarage</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {isLogin ? translate("auth.login") : translate("auth.register")}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {isLogin ? "Welcome back to SmartGarage" : "Join the SmartGarage community"}
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-6">
            <button
              onClick={() => {
                setIsLogin(true)
                setError(null)
                setSuccess(null)
              }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                isLogin
                  ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {translate("auth.login")}
            </button>
            <button
              onClick={() => {
                setIsLogin(false)
                setError(null)
                setSuccess(null)
              }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                !isLogin
                  ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {translate("auth.register")}
            </button>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-md">
              <div className="flex items-center">
                <Icon name="alert-circle" size={20} className="text-red-600 dark:text-red-400 mr-2" />
                <span className="text-red-700 dark:text-red-300">{error}</span>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-md">
              <div className="flex items-center">
                <Icon name="check" size={20} className="text-green-600 dark:text-green-400 mr-2" />
                <span className="text-green-700 dark:text-green-300">{success}</span>
              </div>
            </div>
          )}

          {/* Forms */}
          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-4">
              {!isLogin && (
                <div className="mb-4 text-center">
                  <button
                    type="button"
                    onClick={handleAdminLogin}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    🔑 Quick Admin Access
                  </button>
                </div>
              )}

              {showAdminLogin && (
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-md">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Admin Credentials:</strong>
                    <br />
                    Email: smartgaragerwanda@gmail.com
                    <br />
                    Password: SmartGarage2024!
                  </p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {translate("common.email")} *
                </label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {translate("auth.password")} *
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Enter your password"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Icon name="loader" size={16} className="mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  translate("auth.login")
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {translate("auth.fullName")} *
                </label>
                <input
                  type="text"
                  value={registerForm.fullName}
                  onChange={(e) => setRegisterForm((prev) => ({ ...prev, fullName: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {translate("common.email")} *
                </label>
                <input
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {translate("auth.password")} *
                </label>
                <input
                  type="password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm((prev) => ({ ...prev, password: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Create a password (min 6 characters)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {translate("auth.confirmPassword")} *
                </label>
                <input
                  type="password"
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Confirm your password"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Icon name="loader" size={16} className="mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  translate("auth.register")
                )}
              </Button>
            </form>
          )}

          {/* Additional Info */}
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
            {isLogin ? (
              <p>
                Don't have an account?{" "}
                <button onClick={() => setIsLogin(false)} className="text-blue-600 dark:text-blue-400 hover:underline">
                  Sign up here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button onClick={() => setIsLogin(true)} className="text-blue-600 dark:text-blue-400 hover:underline">
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
