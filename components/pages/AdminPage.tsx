"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "../Button"
import { Icon } from "../Icon"
import { Modal } from "../Modal"
import { useAuth } from "../../contexts/AuthContext"
import { supabase } from "../../services/supabaseClient"
import { AppView, type SmartCarReminder, type UserProfile } from "../../types"

interface AdminPageProps {
  onNavigate: (view: AppView) => void
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth()

  const [activeTab, setActiveTab] = useState<"dashboard" | "users" | "reminders" | "services">("dashboard")
  const [users, setUsers] = useState<UserProfile[]>([])
  const [reminders, setReminders] = useState<SmartCarReminder[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showReminderModal, setShowReminderModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null)

  const [reminderForm, setReminderForm] = useState({
    title: "",
    message: "",
    reminder_type: "general" as "maintenance" | "inspection" | "service" | "general",
    due_date: "",
  })

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalServices: 0,
    totalReminders: 0,
    revenueThisMonth: 0,
  })

  useEffect(() => {
    if (currentUser?.is_admin) {
      fetchAdminData()
    }
  }, [currentUser])

  const fetchAdminData = async () => {
    setIsLoading(true)
    try {
      // Fetch users
      const { data: usersData } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

      // Fetch reminders
      const { data: remindersData } = await supabase
        .from("smart_car_reminders")
        .select(`
          *,
          profiles:profiles (
            full_name,
            email
          )
        `)
        .order("created_at", { ascending: false })

      // Fetch stats
      const { count: userCount } = await supabase.from("profiles").select("*", { count: "exact", head: true })

      const { count: diagnosisCount } = await supabase
        .from("diagnosis_requests")
        .select("*", { count: "exact", head: true })

      const { count: batteryCount } = await supabase
        .from("battery_requests")
        .select("*", { count: "exact", head: true })

      const { count: reminderCount } = await supabase
        .from("smart_car_reminders")
        .select("*", { count: "exact", head: true })

      setUsers(usersData || [])
      setReminders(remindersData || [])
      setStats({
        totalUsers: userCount || 0,
        totalServices: (diagnosisCount || 0) + (batteryCount || 0),
        totalReminders: reminderCount || 0,
        revenueThisMonth: (diagnosisCount || 0) * 10000 + (batteryCount || 0) * 15000,
      })
    } catch (error) {
      console.error("Error fetching admin data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const sendReminder = async () => {
    if (!selectedUser || !reminderForm.title || !reminderForm.message) return

    try {
      const { error } = await supabase.from("smart_car_reminders").insert([
        {
          user_id: selectedUser.id,
          title: reminderForm.title,
          message: reminderForm.message,
          reminder_type: reminderForm.reminder_type,
          due_date: reminderForm.due_date || null,
          is_read: false,
        },
      ])

      if (error) throw error

      setShowReminderModal(false)
      setReminderForm({ title: "", message: "", reminder_type: "general", due_date: "" })
      setSelectedUser(null)
      fetchAdminData()
    } catch (error) {
      console.error("Error sending reminder:", error)
    }
  }

  // Check if user is admin
  if (!currentUser?.is_admin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Icon name="lock" size={48} className="mx-auto text-red-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">You don't have admin privileges</p>
          <Button onClick={() => onNavigate(AppView.LANDING)}>Go to Home</Button>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "home" },
    { id: "users", label: "Users", icon: "users" },
    { id: "reminders", label: "Reminders", icon: "bell" },
    { id: "services", label: "Services", icon: "settings" },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                    <Icon name="users" size={24} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</h3>
                    <p className="text-gray-600 dark:text-gray-300">Total Users</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                    <Icon name="car" size={24} className="text-green-600 dark:text-green-400" />
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
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalReminders}</h3>
                    <p className="text-gray-600 dark:text-gray-300">Reminders Sent</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                    <Icon name="dollar-sign" size={24} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {(stats.revenueThisMonth / 1000).toFixed(0)}K RWF
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">Revenue</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {users.slice(0, 5).map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Icon name="user" size={16} className="text-gray-400 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">{user.full_name} joined</span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {user.created_at && new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "users":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">User Management</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                            <Icon name="user" size={16} className="text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-gray-900 dark:text-white font-medium">{user.full_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                        {user.created_at && new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user)
                            setShowReminderModal(true)
                          }}
                        >
                          Send Reminder
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case "reminders":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Smart Car Reminders</h3>
              <Button onClick={() => setShowReminderModal(true)}>
                <Icon name="plus" size={16} className="mr-2" />
                Send New Reminder
              </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Sent
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {reminders.map((reminder) => (
                      <tr key={reminder.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-gray-900 dark:text-white font-medium">
                            {(reminder as any).profiles?.full_name || "Unknown User"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                          {reminder.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              reminder.reminder_type === "maintenance"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                : reminder.reminder_type === "inspection"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                  : reminder.reminder_type === "service"
                                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                            }`}
                          >
                            {reminder.reminder_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              reminder.is_read
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                            }`}
                          >
                            {reminder.is_read ? "Read" : "Unread"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                          {reminder.created_at && new Date(reminder.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case "services":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Service Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Virtual Diagnosis</h4>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {Math.floor(stats.totalServices * 0.6)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Total requests</p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Battery Prediction</h4>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {Math.floor(stats.totalServices * 0.4)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Total requests</p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Admin Panel</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Manage SmartGarage platform and users</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <Icon name={tab.icon as any} size={16} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {isLoading ? (
          <div className="text-center py-12">
            <Icon name="loader" size={32} className="mx-auto text-blue-600 dark:text-blue-400 mb-4 animate-spin" />
            <p className="text-gray-600 dark:text-gray-300">Loading admin data...</p>
          </div>
        ) : (
          renderTabContent()
        )}

        {/* Send Reminder Modal */}
        <Modal
          isOpen={showReminderModal}
          onClose={() => {
            setShowReminderModal(false)
            setSelectedUser(null)
            setReminderForm({ title: "", message: "", reminder_type: "general", due_date: "" })
          }}
          title="Send Smart Car Reminder"
        >
          <div className="space-y-4">
            {!selectedUser && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select User</label>
                <select
                  onChange={(e) => {
                    const user = users.find((u) => u.id === e.target.value)
                    setSelectedUser(user || null)
                  }}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="">Choose a user...</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.full_name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedUser && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-md">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Sending to: <strong>{selectedUser.full_name}</strong> ({selectedUser.email})
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reminder Type</label>
              <select
                value={reminderForm.reminder_type}
                onChange={(e) => setReminderForm((prev) => ({ ...prev, reminder_type: e.target.value as any }))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="general">General</option>
                <option value="maintenance">Maintenance</option>
                <option value="inspection">Technical Inspection</option>
                <option value="service">Service Required</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
              <input
                type="text"
                value={reminderForm.title}
                onChange={(e) => setReminderForm((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Oil Change Reminder"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message *</label>
              <textarea
                value={reminderForm.message}
                onChange={(e) => setReminderForm((prev) => ({ ...prev, message: e.target.value }))}
                placeholder="Your vehicle is due for an oil change. Please schedule an appointment..."
                rows={4}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Due Date (Optional)
              </label>
              <input
                type="date"
                value={reminderForm.due_date}
                onChange={(e) => setReminderForm((prev) => ({ ...prev, due_date: e.target.value }))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowReminderModal(false)
                  setSelectedUser(null)
                  setReminderForm({ title: "", message: "", reminder_type: "general", due_date: "" })
                }}
              >
                Cancel
              </Button>
              <Button onClick={sendReminder} disabled={!selectedUser || !reminderForm.title || !reminderForm.message}>
                <Icon name="bell" size={16} className="mr-2" />
                Send Reminder
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}
