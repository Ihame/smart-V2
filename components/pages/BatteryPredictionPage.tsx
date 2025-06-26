"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../Button"
import { Icon } from "../Icon"
import { useLanguage } from "../../contexts/LanguageContext"
import { useAuth } from "../../contexts/AuthContext"
import { supabase } from "../../services/supabaseClient"
import { BatteryPredictionStep, type ContactInfo } from "../../types"
import { CHARGING_METHODS } from "../../constants"

interface BatteryUsageDetails {
  carModel: string
  currentMileage: number
  averageDrivingDistance: number
  chargingMethod: string
}

export const BatteryPredictionPage: React.FC = () => {
  const { translate } = useLanguage()
  const { currentUser } = useAuth()

  const [currentStep, setCurrentStep] = useState<BatteryPredictionStep>(BatteryPredictionStep.VEHICLE_USAGE)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [usageDetails, setUsageDetails] = useState<BatteryUsageDetails>({
    carModel: "",
    currentMileage: 0,
    averageDrivingDistance: 0,
    chargingMethod: "",
  })

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: currentUser?.email || "",
    phone: "",
  })

  const steps = [
    BatteryPredictionStep.VEHICLE_USAGE,
    BatteryPredictionStep.PRELIMINARY_INSIGHT,
    BatteryPredictionStep.CONTACT_INFO,
    BatteryPredictionStep.CONFIRMATION,
  ]

  const currentStepIndex = steps.indexOf(currentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const handleNext = async () => {
    setError(null)

    try {
      switch (currentStep) {
        case BatteryPredictionStep.VEHICLE_USAGE:
          if (
            !usageDetails.carModel ||
            !usageDetails.currentMileage ||
            !usageDetails.averageDrivingDistance ||
            !usageDetails.chargingMethod
          ) {
            setError("Please fill in all required fields")
            return
          }
          setCurrentStep(BatteryPredictionStep.PRELIMINARY_INSIGHT)
          break

        case BatteryPredictionStep.PRELIMINARY_INSIGHT:
          setCurrentStep(BatteryPredictionStep.CONTACT_INFO)
          break

        case BatteryPredictionStep.CONTACT_INFO:
          if (!contactInfo.email || !contactInfo.phone) {
            setError("Please provide both email and phone number")
            return
          }

          setIsLoading(true)
          try {
            const { error: dbError } = await supabase.from("battery_requests").insert([
              {
                user_id: currentUser?.id,
                car_model: usageDetails.carModel,
                current_mileage: usageDetails.currentMileage,
                average_driving_distance: usageDetails.averageDrivingDistance,
                charging_method: usageDetails.chargingMethod,
                contact_email: contactInfo.email,
                contact_phone: contactInfo.phone,
              },
            ])

            if (dbError) throw dbError
            setCurrentStep(BatteryPredictionStep.CONFIRMATION)
          } catch (err) {
            setError("Failed to save battery prediction request. Please try again.")
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

  const renderStepContent = () => {
    switch (currentStep) {
      case BatteryPredictionStep.VEHICLE_USAGE:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{translate("battery.vehicleUsage")}</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Car Model *</label>
              <input
                type="text"
                value={usageDetails.carModel}
                onChange={(e) => setUsageDetails((prev) => ({ ...prev, carModel: e.target.value }))}
                placeholder="e.g., Toyota Prius, Nissan Leaf, BMW i3"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Mileage (km) *
              </label>
              <input
                type="number"
                value={usageDetails.currentMileage || ""}
                onChange={(e) =>
                  setUsageDetails((prev) => ({ ...prev, currentMileage: Number.parseInt(e.target.value) || 0 }))
                }
                placeholder="e.g., 45000"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Average Daily Driving Distance (km) *
              </label>
              <input
                type="number"
                value={usageDetails.averageDrivingDistance || ""}
                onChange={(e) =>
                  setUsageDetails((prev) => ({ ...prev, averageDrivingDistance: Number.parseInt(e.target.value) || 0 }))
                }
                placeholder="e.g., 50"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary Charging Method *
              </label>
              <select
                value={usageDetails.chargingMethod}
                onChange={(e) => setUsageDetails((prev) => ({ ...prev, chargingMethod: e.target.value }))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">Select Charging Method</option>
                {CHARGING_METHODS.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )

      case BatteryPredictionStep.PRELIMINARY_INSIGHT:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {translate("battery.preliminaryInsight")}
            </h2>

            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6">
              <div className="flex items-start">
                <Icon name="battery" size={24} className="text-blue-600 dark:text-blue-400 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Preliminary Battery Analysis
                  </h3>
                  <div className="text-gray-700 dark:text-gray-300 space-y-3">
                    <p>
                      <strong>Vehicle:</strong> {usageDetails.carModel}
                    </p>
                    <p>
                      <strong>Current Mileage:</strong> {usageDetails.currentMileage.toLocaleString()} km
                    </p>
                    <p>
                      <strong>Daily Usage:</strong> {usageDetails.averageDrivingDistance} km/day
                    </p>
                    <p>
                      <strong>Charging Method:</strong> {usageDetails.chargingMethod}
                    </p>

                    <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-md">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Initial Assessment:</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Based on typical usage patterns for your vehicle model and charging habits, your battery appears
                        to be in the normal usage range. Our specialists will provide detailed analysis including:
                      </p>
                      <ul className="list-disc list-inside mt-2 text-gray-700 dark:text-gray-300 space-y-1">
                        <li>Estimated remaining battery life</li>
                        <li>Optimal charging recommendations</li>
                        <li>Maintenance schedule suggestions</li>
                        <li>Performance optimization tips</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case BatteryPredictionStep.CONTACT_INFO:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{translate("battery.contactInfo")}</h2>

            <p className="text-gray-600 dark:text-gray-300">
              Our battery specialists will contact you with detailed analysis and recommendations.
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

      case BatteryPredictionStep.CONFIRMATION:
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="check" size={32} className="text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {translate("battery.confirmation")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 space-y-2">
              <p>Thank you for submitting your battery prediction request!</p>
              <p>Our battery specialists will analyze your usage patterns and contact you within 24-48 hours.</p>
              <p>
                You will receive detailed insights at: <strong>{contactInfo.email}</strong>
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
          {currentStep !== BatteryPredictionStep.CONFIRMATION && (
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
