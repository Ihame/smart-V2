"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../Button"
import { Icon } from "../Icon"
import { Modal } from "../Modal"
import { useLanguage } from "../../contexts/LanguageContext"
import { useAuth } from "../../contexts/AuthContext"
import { supabase } from "../../services/supabaseClient"

interface DemoRequestForm {
  userName: string
  garageName: string
  email: string
  phone: string
}

export const GarageSolutionsPage: React.FC = () => {
  const { translate } = useLanguage()
  const { currentUser } = useAuth()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [demoForm, setDemoForm] = useState<DemoRequestForm>({
    userName: currentUser?.full_name || "",
    garageName: "",
    email: currentUser?.email || "",
    phone: "",
  })

  const handleRequestDemo = () => {
    setIsModalOpen(true)
    setError(null)
    setSuccess(false)
  }

  const handleSubmitDemo = async () => {
    if (!demoForm.userName || !demoForm.garageName || !demoForm.email) {
      setError("Please fill in all required fields")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { error: dbError } = await supabase.from("garage_demo_requests").insert([
        {
          user_id: currentUser?.id,
          user_name: demoForm.userName,
          garage_name: demoForm.garageName,
          email: demoForm.email,
          phone: demoForm.phone || null,
        },
      ])

      if (dbError) throw dbError

      setSuccess(true)
      setTimeout(() => {
        setIsModalOpen(false)
        setSuccess(false)
        setDemoForm({
          userName: currentUser?.full_name || "",
          garageName: "",
          email: currentUser?.email || "",
          phone: "",
        })
      }, 2000)
    } catch (err) {
      setError("Failed to submit demo request. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setError(null)
    setSuccess(false)
  }

  const features = [
    {
      icon: "diagnostic",
      title: "AI Diagnostics Integration",
      description: "Seamlessly integrate with our virtual diagnosis system for comprehensive vehicle analysis",
    },
    {
      icon: "calendar",
      title: "Appointment Scheduling",
      description: "Advanced booking system with automated reminders and customer notifications",
    },
    {
      icon: "parts",
      title: "Inventory Management",
      description: "Track spare parts, manage stock levels, and automate reordering for EV/Hybrid components",
    },
    {
      icon: "user",
      title: "Customer Relationship Management",
      description: "Maintain detailed customer profiles, service history, and follow-up schedules",
    },
    {
      icon: "settings",
      title: "Workshop Management",
      description: "Optimize technician schedules, track job progress, and manage multiple service bays",
    },
    {
      icon: "battery",
      title: "EV/Hybrid Specialization",
      description:
        "Specialized modules for electric vehicle diagnostics, battery health monitoring, and hybrid systems",
    },
  ]

  const benefits = [
    "Increase operational efficiency by up to 40%",
    "Reduce customer wait times with smart scheduling",
    "Improve customer satisfaction with automated updates",
    "Streamline inventory management and reduce waste",
    "Generate detailed reports and analytics",
    "Scale your business with multi-location support",
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">SmartGarage ERP</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Complete garage management solution for EV and hybrid vehicle service centers
            </p>
            <Button size="lg" onClick={handleRequestDemo} className="bg-white text-blue-600 hover:bg-gray-100">
              <Icon name="calendar" size={20} className="mr-2" />
              Request a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Garage Management
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to run a modern EV/Hybrid service center
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <Icon name={feature.icon as any} size={24} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Transform Your Garage Operations
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Join hundreds of garage owners across Africa who have revolutionized their operations with SmartGarage
                ERP. Our platform is specifically designed for the unique needs of EV and hybrid vehicle service
                centers.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <Icon name="check" size={20} className="text-green-600 dark:text-green-400 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Ready to Get Started?</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Icon name="check" size={20} className="text-green-600 dark:text-green-400 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300">Free 30-day trial</span>
                </div>
                <div className="flex items-center">
                  <Icon name="check" size={20} className="text-green-600 dark:text-green-400 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300">Full setup and training included</span>
                </div>
                <div className="flex items-center">
                  <Icon name="check" size={20} className="text-green-600 dark:text-green-400 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300">24/7 customer support</span>
                </div>
                <div className="flex items-center">
                  <Icon name="check" size={20} className="text-green-600 dark:text-green-400 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300">No long-term contracts</span>
                </div>
              </div>
              <Button onClick={handleRequestDemo} className="w-full mt-6">
                Schedule Your Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Garage Owners Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="star" size={16} />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                "SmartGarage ERP transformed our operations. We can now handle 3x more vehicles with the same staff. The
                EV diagnostic integration is a game-changer!"
              </p>
              <div className="flex items-center">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="Garage Owner"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Samuel Nkurunziza</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">EV Service Center, Kigali</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="star" size={16} />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                "The inventory management for hybrid parts is excellent. We never run out of stock anymore, and our
                customers are much happier with faster service."
              </p>
              <div className="flex items-center">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="Garage Owner"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Marie Uwimana</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Hybrid Specialists, Butare</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Request Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Request a Demo">
        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="check" size={32} className="text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Demo Request Submitted!</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our team will contact you within 24 hours to schedule your personalized demo.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-md">
                <div className="flex items-center">
                  <Icon name="alert-circle" size={20} className="text-red-600 dark:text-red-400 mr-2" />
                  <span className="text-red-700 dark:text-red-300">{error}</span>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Name *</label>
              <input
                type="text"
                value={demoForm.userName}
                onChange={(e) => setDemoForm((prev) => ({ ...prev, userName: e.target.value }))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Garage Name *</label>
              <input
                type="text"
                value={demoForm.garageName}
                onChange={(e) => setDemoForm((prev) => ({ ...prev, garageName: e.target.value }))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Your garage/business name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email *</label>
              <input
                type="email"
                value={demoForm.email}
                onChange={(e) => setDemoForm((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone (Optional)
              </label>
              <input
                type="tel"
                value={demoForm.phone}
                onChange={(e) => setDemoForm((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="+250 788 123 456"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button onClick={handleSubmitDemo} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Icon name="loader" size={16} className="mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Request Demo"
                )}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
