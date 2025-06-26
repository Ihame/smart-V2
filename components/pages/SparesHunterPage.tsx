"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../Button"
import { Icon } from "../Icon"
import { useLanguage } from "../../contexts/LanguageContext"
import { useAuth } from "../../contexts/AuthContext"
import { supabase } from "../../services/supabaseClient"
import { validateImageFile } from "../../services/imageUtils"
import { SparesStep, type ContactInfo } from "../../types"
import { CAR_BRANDS_MODELS } from "../../constants"

interface PartDetails {
  description: string
  carBrand: string
  carModel: string
  photo?: File
}

export const SparesHunterPage: React.FC = () => {
  const { translate } = useLanguage()
  const { currentUser } = useAuth()

  const [currentStep, setCurrentStep] = useState<SparesStep>(SparesStep.PART_DETAILS)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [partDetails, setPartDetails] = useState<PartDetails>({
    description: "",
    carBrand: "",
    carModel: "",
    photo: undefined,
  })

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: currentUser?.email || "",
    phone: "",
  })

  const steps = [SparesStep.PART_DETAILS, SparesStep.CONTACT_INFO, SparesStep.CONFIRMATION]

  const currentStepIndex = steps.indexOf(currentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const handleNext = async () => {
    setError(null)

    try {
      switch (currentStep) {
        case SparesStep.PART_DETAILS:
          if (!partDetails.description.trim()) {
            setError("Please describe the part you need")
            return
          }
          setCurrentStep(SparesStep.CONTACT_INFO)
          break

        case SparesStep.CONTACT_INFO:
          if (!contactInfo.email || !contactInfo.phone) {
            setError("Please provide both email and phone number")
            return
          }

          setIsLoading(true)
          try {
            const { error: dbError } = await supabase.from("spare_part_requests").insert([
              {
                user_id: currentUser?.id,
                part_description: partDetails.description,
                car_brand: partDetails.carBrand || null,
                car_model: partDetails.carModel || null,
                contact_email: contactInfo.email,
                contact_phone: contactInfo.phone,
              },
            ])

            if (dbError) throw dbError
            setCurrentStep(SparesStep.CONFIRMATION)
          } catch (err) {
            setError("Failed to save spare part request. Please try again.")
          } finally {
            setIsLoading(false)
          }
          break
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    }
  }

  const handleBack = () => {
    const prevStepIndex = currentStepIndex - 1
    if (prevStepIndex >= 0) {
      setCurrentStep(steps[prevStepIndex])
    }
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const validation = validateImageFile(file)
      if (!validation.isValid) {
        setError(validation.error || "Invalid file")
        return
      }
      setPartDetails((prev) => ({ ...prev, photo: file }))
      setError(null)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case SparesStep.PART_DETAILS:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Part Details</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Describe the part you need *
              </label>
              <textarea
                value={partDetails.description}
                onChange={(e) => setPartDetails((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="e.g., Front brake pads for Toyota Prius 2018, Battery cooling fan, etc."
                rows={4}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Car Brand (Optional)
                </label>
                <select
                  value={partDetails.carBrand}
                  onChange={(e) => {
                    setPartDetails((prev) => ({ ...prev, carBrand: e.target.value, carModel: "" }))
                  }}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="">Select Brand</option>
                  {Object.keys(CAR_BRANDS_MODELS).map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {partDetails.carBrand && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Car Model (Optional)
                  </label>
                  <select
                    value={partDetails.carModel}
                    onChange={(e) => setPartDetails((prev) => ({ ...prev, carModel: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="">Select Model</option>
                    {CAR_BRANDS_MODELS[partDetails.carBrand as keyof typeof CAR_BRANDS_MODELS]?.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload Photo (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-6 text-center">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/gif"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="part-photo-upload"
                />
                <label htmlFor="part-photo-upload" className="cursor-pointer">
                  <Icon name="upload" size={48} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600 dark:text-gray-300">Click to upload part photo</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
                </label>
                {partDetails.photo && (
                  <p className="text-green-600 dark:text-green-400 mt-2">✓ {partDetails.photo.name}</p>
                )}
              </div>
            </div>
          </div>
        )

      case SparesStep.CONTACT_INFO:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Information</h2>

            <p className="text-gray-600 dark:text-gray-300">
              Our parts sourcing team will contact you with availability and pricing information.
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address *</label>
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number *</label>
              <input
                type="tel"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="+250 788 123 456"
              />
            </div>
          </div>
        )

      case SparesStep.CONFIRMATION:
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="check" size={32} className="text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Request Submitted Successfully!</h2>
            <div className="text-gray-600 dark:text-gray-300 space-y-2">
              <p>Thank you for your spare parts request!</p>
              <p>Our parts sourcing team will search for your requested part and contact you within 24-48 hours.</p>
              <p>
                We'll reach you at: <strong>{contactInfo.email}</strong> or <strong>{contactInfo.phone}</strong>
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Spares Hunter</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Find genuine spare parts for your electric and hybrid vehicle
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
            <span>
              Step {currentStepIndex + 1} of {steps.length}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-md">
              <div className="flex items-center">
                <Icon name="alert-circle" size={20} className="text-red-600 dark:text-red-400 mr-2" />
                <span className="text-red-700 dark:text-red-300">{error}</span>
              </div>
            </div>
          )}

          {renderStepContent()}

          {/* Navigation Buttons */}
          {currentStep !== SparesStep.CONFIRMATION && (
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handleBack} disabled={currentStepIndex === 0}>
                <Icon name="chevron-left" size={16} className="mr-2" />
                {translate("common.back")}
              </Button>

              <Button onClick={handleNext} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Icon name="loader" size={16} className="mr-2 animate-spin" />
                    {translate("common.loading")}
                  </>
                ) : (
                  <>
                    {translate("common.next")}
                    <Icon name="chevron-right" size={16} className="ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
