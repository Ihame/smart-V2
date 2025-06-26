"use client"

import type React from "react"
import { useState } from "react"
import { ProductCard } from "../ProductCard"
import { Modal } from "../Modal"
import { Button } from "../Button"
import { Icon } from "../Icon"
import { useLanguage } from "../../contexts/LanguageContext"
import { useAuth } from "../../contexts/AuthContext"
import { supabase } from "../../services/supabaseClient"
import type { OBDProduct } from "../../types"
import { SAMPLE_OBD_PRODUCTS } from "../../constants"

interface OBDInquiryForm {
  userName: string
  email: string
  phone: string
  message: string
}

export const OBDInfoPage: React.FC = () => {
  const { translate } = useLanguage()
  const { currentUser } = useAuth()

  const [selectedProduct, setSelectedProduct] = useState<OBDProduct | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [inquiryForm, setInquiryForm] = useState<OBDInquiryForm>({
    userName: currentUser?.full_name || "",
    email: currentUser?.email || "",
    phone: "",
    message: "",
  })

  const handleRequestInfo = (product: OBDProduct) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
    setError(null)
    setSuccess(false)
  }

  const handleSubmitInquiry = async () => {
    if (!selectedProduct) return

    if (!inquiryForm.userName || !inquiryForm.email || !inquiryForm.phone) {
      setError("Please fill in all required fields")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { error: dbError } = await supabase.from("obd_inquiries").insert([
        {
          user_id: currentUser?.id,
          product_id: selectedProduct.id,
          product_name: selectedProduct.name,
          user_name: inquiryForm.userName,
          email: inquiryForm.email,
          phone: inquiryForm.phone,
          message: inquiryForm.message || null,
        },
      ])

      if (dbError) throw dbError

      setSuccess(true)
      setTimeout(() => {
        setIsModalOpen(false)
        setSuccess(false)
        setInquiryForm({
          userName: currentUser?.full_name || "",
          email: currentUser?.email || "",
          phone: "",
          message: "",
        })
      }, 2000)
    } catch (err) {
      setError("Failed to submit inquiry. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
    setError(null)
    setSuccess(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">OBD Diagnostic Tools</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Professional OBD scanners and diagnostic tools specifically designed for electric and hybrid vehicles. Get
            real-time insights into your vehicle's performance and health.
          </p>
        </div>

        {/* Features Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Why Choose Our OBD Tools?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="battery" size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">EV/Hybrid Specialized</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Designed specifically for electric and hybrid vehicle diagnostics
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="check" size={24} className="text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Professional Grade</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Used by certified mechanics and automotive professionals
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="settings" size={24} className="text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Easy to Use</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                User-friendly interface with mobile app integration
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SAMPLE_OBD_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} onRequestInfo={handleRequestInfo} />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900 rounded-lg p-6">
          <div className="flex items-start">
            <Icon name="info" size={24} className="text-blue-600 dark:text-blue-400 mr-3 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Need Help Choosing?</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our technical team can help you select the right OBD scanner for your specific vehicle and needs.
                Contact us for personalized recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center">
                  <Icon name="mail" size={16} className="mr-2" />
                  <span>support@smartgarage.rw</span>
                </div>
                <div className="flex items-center">
                  <Icon name="phone" size={16} className="mr-2" />
                  <span>+250 788 123 456</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={`Request Info: ${selectedProduct?.name}`}>
        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="check" size={32} className="text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Inquiry Submitted!</h3>
            <p className="text-gray-600 dark:text-gray-300">Our team will contact you within 24 hours.</p>
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name *</label>
              <input
                type="text"
                value={inquiryForm.userName}
                onChange={(e) => setInquiryForm((prev) => ({ ...prev, userName: e.target.value }))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email *</label>
              <input
                type="email"
                value={inquiryForm.email}
                onChange={(e) => setInquiryForm((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone *</label>
              <input
                type="tel"
                value={inquiryForm.phone}
                onChange={(e) => setInquiryForm((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="+250 788 123 456"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message (Optional)
              </label>
              <textarea
                value={inquiryForm.message}
                onChange={(e) => setInquiryForm((prev) => ({ ...prev, message: e.target.value }))}
                rows={3}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Any specific questions or requirements..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button onClick={handleSubmitInquiry} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Icon name="loader" size={16} className="mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Inquiry"
                )}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
