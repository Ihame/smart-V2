"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "../Button"
import { Icon } from "../Icon"
import { useLanguage } from "../../contexts/LanguageContext"
import { useAuth } from "../../contexts/AuthContext"
import { supabase } from "../../services/supabaseClient"
import { AppView, type SmartCarReminder } from "../../types"

interface DashboardPageProps {
  onNavigate: (view: AppView) => void
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { translate } = useLanguage()
  const { currentUser } = useAuth()

  const [reminders, setReminders] = useState<SmartCarReminder[]>([])
  const [isLoadingReminders, setIsLoadingReminders] = useState(true)
  const [stats, setStats] = useState({
    totalServices: 0,
    activeReminders: 0,
    lastService: null as string | null,
  })

  useEffect(() => {
    if (currentUser) {
      fetchReminders()
      fetchUserStats()
    }
  }, [currentUser])

  const fetchReminders = async () => {
    if (!currentUser) return

    try {
      const { data, error } = await supabase
        .from("smart_car_reminders")
        .select("*")
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false })

      if (error) throw error
      setReminders(data || [])
    } catch (error) {
      console.error("Error fetching reminders:", error)
      setReminders([])
    } finally {
      setIsLoadingReminders(false)
    }
  }

  const fetchUserStats = async () => {
    if (!currentUser) return

    try {
      // Count diagnosis requests
      const { count: diagnosisCount } = await supabase
        .from("diagnosis_requests")
        .select("*", { count: "exact", head: true })
        .eq("user_id", currentUser.id)

      // Count battery requests
      const { count: batteryCount } = await supabase
        .from("battery_requests")
        .select("*", { count: "exact", head: true })
        .eq("user_id", currentUser.id)

      // Get latest service
      const { data: latestService } = await supabase
        .from("diagnosis_requests")
        .select("created_at")
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false })
        .limit(1)

      setStats({
        totalServices: (diagnosisCount || 0) + (batteryCount || 0),
        activeReminders: reminders.filter((r) => !r.is_read).length,
        lastService: latestService?.[0]?.created_at || null,
      })
    } catch (error) {
      console.error("Error fetching user stats:", error)
    }
  }

  const markReminderAsRead = async (reminderId: string) => {
    try {
      const { error } = await supabase.from("smart_car_reminders").update({ is_read: true }).eq("id", reminderId)

      if (error) throw error

      setReminders((prev) =>
        prev.map((reminder) => (reminder.id === reminderId ? { ...reminder, is_read: true } : reminder)),
      )
    } catch (error) {
      console.error("Error marking reminder as read:", error)
    }
  }

  const getReminderIcon = (type: string) => {
    switch (type) {
      case "maintenance":
        return "settings"
      case "inspection":
        return "search"
      case "service":
        return "wrench"
      default:
        return "bell"
    }
  }

  const getReminderColor = (type: string) => {
    switch (type) {
      case "maintenance":
        return "text-blue-600 dark:text-blue-400"
      case "inspection":
        return "text-yellow-600 dark:text-yellow-400"
      case "service":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  const quickActions = [
    {
      title: "Virtual Diagnosis",
      description: "Get AI-powered vehicle diagnosis",
      icon: "diagnostic",
      price: "10,000 RWF",
      view: AppView.VIRTUAL_DIAGNOSIS,
      color: "bg-blue-500",
    },
    {
      title: "Battery Prediction",
      description: "Analyze your battery health",
      icon: "battery",
      price: "15,000 RWF",
      view: AppView.BATTERY_PREDICTION,
      color: "bg-green-500",
    },
    {
      title: "Find Spare Parts",
      description: "Search for genuine parts",
      icon: "parts",
      price: "Free",
      view: AppView.SPARES_HUNTER,
      color: "bg-purple-500",
    },
    {
      title: "Community",
      description: "Connect with other EV owners",
      icon: "users",
      price: "Free",
      view: AppView.COMMUNITY,
      color: "bg-orange-500",
    },
  ]

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Icon name="user" size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Please Login</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">You need to be logged in to access your dashboard</p>
          <Button onClick={() => onNavigate(AppView.AUTH)}>Login to Continue</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {translate("dashboard.title")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {translate("dashboard.welcome")}, {currentUser.full_name}!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                <Icon name="car" size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalServices}</h3>
                <p className="text-gray-600 dark:text-gray-300">Total Services</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mr-4">
                <Icon name="bell" size={24} className="text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeReminders}</h3>
                <p className="text-gray-600 dark:text-gray-300">Active Reminders</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                <Icon name="clock" size={24} className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {stats.lastService ? new Date(stats.lastService).toLocaleDateString() : "No services yet"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">Last Service</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Smart Car Reminders */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {translate("dashboard.smartCarReminders")}
                </h2>
                <Icon name="bell" size={24} className="text-blue-600 dark:text-blue-400" />
              </div>

              {isLoadingReminders ? (
                <div className="text-center py-8">
                  <Icon
                    name="loader"
                    size={32}
                    className="mx-auto text-blue-600 dark:text-blue-400 mb-4 animate-spin"
                  />
                  <p className="text-gray-600 dark:text-gray-300">Loading reminders...</p>
                </div>
              ) : reminders.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="bell" size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Reminders Yet</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our e-mechanics will send you personalized maintenance reminders and alerts
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reminders.map((reminder) => (
                    <div
                      key={reminder.id}
                      className={`p-4 rounded-lg border-l-4 ${
                        reminder.is_read
                          ? "bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                          : "bg-blue-50 dark:bg-blue-900 border-blue-500"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <Icon
                            name={getReminderIcon(reminder.reminder_type) as any}
                            size={20}
                            className={`mr-3 mt-1 ${getReminderColor(reminder.reminder_type)}`}
                          />
                          <div>
                            <h4
                              className={`font-semibold ${reminder.is_read ? "text-gray-700 dark:text-gray-300" : "text-gray-900 dark:text-white"}`}
                            >
                              {reminder.title}
                            </h4>
                            <p
                              className={`text-sm ${reminder.is_read ? "text-gray-600 dark:text-gray-400" : "text-gray-700 dark:text-gray-300"}`}
                            >
                              {reminder.message}
                            </p>
                            {reminder.due_date && (
                              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                Due: {new Date(reminder.due_date).toLocaleDateString()}
                              </p>
                            )}
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {new Date(reminder.created_at!).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        {!reminder.is_read && (
                          <Button size="sm" variant="ghost" onClick={() => markReminderAsRead(reminder.id!)}>
                            <Icon name="check" size={16} />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {translate("dashboard.quickActions")}
              </h2>
              <div className="space-y-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => onNavigate(action.view)}
                    className="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-left group"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform`}
                      >
                        <Icon name={action.icon as any} size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{action.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{action.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{action.price}</p>
                        <Icon
                          name="arrow-right"
                          size={16}
                          className="text-gray-400 group-hover:text-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Icon name="check" size={16} className="text-green-500 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300">Account created successfully</span>
                </div>
                {stats.totalServices > 0 && (
                  <div className="flex items-center text-sm">
                    <Icon name="car" size={16} className="text-blue-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">Used {stats.totalServices} service(s)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
