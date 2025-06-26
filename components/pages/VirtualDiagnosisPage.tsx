"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../Button"
import { Icon } from "../Icon"
import { useLanguage } from "../../contexts/LanguageContext"
import { useAuth } from "../../contexts/AuthContext"
import { supabase } from "../../services/supabaseClient"
import { getVirtualDiagnosis } from "../../services/geminiService"
import { validateImageFile } from "../../services/imageUtils"
import {
  DiagnosisStep,
  type VehicleDetails,
  type IssueDescription,
  type ContactInfo,
  type StructuredDiagnosisReport,
} from "../../types"
import { CAR_BRANDS_MODELS } from "../../constants"

export const VirtualDiagnosisPage: React.FC = () => {
  const { translate } = useLanguage()
  const { currentUser, authStatus } = useAuth()

  const [currentStep, setCurrentStep] = useState<DiagnosisStep>(DiagnosisStep.VEHICLE_DETAILS)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form data
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails>({
    brand: "",
    model: "",
    vin: "",
  })

  const [issueDescription, setIssueDescription] = useState<IssueDescription>({
    description: "",
    photo: undefined,
  })

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: currentUser?.email || "",
    phone: "",
  })

  const [diagnosisReport, setDiagnosisReport] = useState<StructuredDiagnosisReport | null>(null)

  const steps = [
    DiagnosisStep.VEHICLE_DETAILS,
    DiagnosisStep.ISSUE_DESCRIPTION,
    DiagnosisStep.PROCESSING,
    DiagnosisStep.REVIEW_INFORMATION,
    DiagnosisStep.E_MECHANIC_PROCESS,
    DiagnosisStep.CONTACT,
    DiagnosisStep.CONFIRMED,
  ]

  const currentStepIndex = steps.indexOf(currentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const handleNext = async () => {
    setError(null)

    try {
      switch (currentStep) {
        case DiagnosisStep.VEHICLE_DETAILS:
          if (!vehicleDetails.brand || !vehicleDetails.model) {
            setError("Please select both car brand and model")
            return
          }
          setCurrentStep(DiagnosisStep.ISSUE_DESCRIPTION)
          break

        case DiagnosisStep.ISSUE_DESCRIPTION:
          if (!issueDescription.description.trim()) {
            setError("Please describe the issue you're experiencing")
            return
          }
          setCurrentStep(DiagnosisStep.PROCESSING)

          // Process diagnosis
          setIsLoading(true)
          try {
            const report = await getVirtualDiagnosis(
              vehicleDetails,
              issueDescription.description,
              !!issueDescription.photo,
            )
            setDiagnosisReport(report)
            setCurrentStep(DiagnosisStep.REVIEW_INFORMATION)
          } catch (err) {
            setError("Failed to process diagnosis. Please try again.")
            setCurrentStep(DiagnosisStep.ISSUE_DESCRIPTION)
          } finally {
            setIsLoading(false)
          }
          break

        case DiagnosisStep.REVIEW_INFORMATION:
          setCurrentStep(DiagnosisStep.E_MECHANIC_PROCESS)
          break

        case DiagnosisStep.E_MECHANIC_PROCESS:
          setCurrentStep(DiagnosisStep.CONTACT)
          break

        case DiagnosisStep.CONTACT:
          if (!contactInfo.email || !contactInfo.phone) {
            setError("Please provide both email and phone number")
            return
          }

          // Save to database
          setIsLoading(true)
          try {
            const { error: dbError } = await supabase.from("diagnosis_requests").insert([
              {
                user_id: currentUser?.id,
                vehicle_brand: vehicleDetails.brand,
                vehicle_model: vehicleDetails.model,
                vin: vehicleDetails.vin,
                issue_description: issueDescription.description,
                contact_email: contactInfo.email,
                contact_phone: contactInfo.phone,
                diagnosis_report: diagnosisReport,
              },
            ])

            if (dbError) throw dbError
            setCurrentStep(DiagnosisStep.CONFIRMED)
          } catch (err) {
            setError("Failed to save diagnosis request. Please try again.")
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
      setIssueDescription((prev) => ({ ...prev, photo: file }))
      setError(null)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case DiagnosisStep.VEHICLE_DETAILS:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {translate("diagnosis.vehicleDetails")}
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Car Brand *</label>
              <select
                value={vehicleDetails.brand}
                onChange={(e) => {
                  setVehicleDetails((prev) => ({ ...prev, brand: e.target.value, model: "" }))
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

            {vehicleDetails.brand && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Car Model *</label>
                <select
                  value={vehicleDetails.model}
                  onChange={(e) => setVehicleDetails((prev) => ({ ...prev, model: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="">Select Model</option>
                  {CAR_BRANDS_MODELS[vehicleDetails.brand as keyof typeof CAR_BRANDS_MODELS]?.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">VIN (Optional)</label>
              <input
                type="text"
                value={vehicleDetails.vin}
                onChange={(e) => setVehicleDetails((prev) => ({ ...prev, vin: e.target.value }))}
                placeholder="Enter VIN if available"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        )

      case DiagnosisStep.ISSUE_DESCRIPTION:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {translate("diagnosis.issueDescription")}
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Describe the issue you're experiencing *
              </label>
              <textarea
                value={issueDescription.description}
                onChange={(e) => setIssueDescription((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Please describe the problem in detail..."
                rows={6}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
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
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Icon name="upload" size={48} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600 dark:text-gray-300">Click to upload dashboard or relevant part photo</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
                </label>
                {issueDescription.photo && (
                  <p className="text-green-600 dark:text-green-400 mt-2">✓ {issueDescription.photo.name}</p>
                )}
              </div>
            </div>
          </div>
        )

      case DiagnosisStep.PROCESSING:
        return (
          <div className="text-center py-12">
            <Icon name="loader" size={48} className="mx-auto text-blue-600 dark:text-blue-400 mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {translate("diagnosis.processing")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">Please wait while we analyze your vehicle information...</p>
          </div>
        )

      case DiagnosisStep.REVIEW_INFORMATION:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{translate("diagnosis.reviewInfo")}</h2>

            {diagnosisReport && (
              <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Icon name="check" size={24} className="text-green-600 dark:text-green-400 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{diagnosisReport.status}</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Vehicle Information:</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      {diagnosisReport.vehicleInfo.brand} {diagnosisReport.vehicleInfo.model}
                      {diagnosisReport.vehicleInfo.vin && ` (VIN: ${diagnosisReport.vehicleInfo.vin})`}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Issue Description:</h4>
                    <p className="text-gray-700 dark:text-gray-300">{diagnosisReport.issueDescription}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Next Steps:</h4>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                      {diagnosisReport.nextSteps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      case DiagnosisStep.E_MECHANIC_PROCESS:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {translate("diagnosis.eMechanicProcess")}
            </h2>

            <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-6">
              <div className="flex items-start">
                <Icon name="info" size={24} className="text-yellow-600 dark:text-yellow-400 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    E-Mechanic Review Process
                  </h3>
                  <div className="text-gray-700 dark:text-gray-300 space-y-2">
                    <p>• A certified e-mechanic will review your vehicle details and issue description</p>
                    <p>• You will be contacted within 24 hours via your provided contact information</p>
                    <p>• Initial consultation and basic advice are provided free of charge</p>
                    <p>
                      • Comprehensive diagnosis and repair services involve fees, which will be discussed during
                      consultation
                    </p>
                    <p>• Our e-mechanics are trained specifically for EV and hybrid vehicle systems</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case DiagnosisStep.CONTACT:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{translate("diagnosis.contact")}</h2>

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

      case DiagnosisStep.CONFIRMED:
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="check" size={32} className="text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {translate("diagnosis.confirmed")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 space-y-2">
              <p>Thank you for submitting your diagnosis request!</p>
              <p>Our certified e-mechanic will review your case and contact you within 24 hours.</p>
              <p>
                You will be reached at: <strong>{contactInfo.email}</strong> or <strong>{contactInfo.phone}</strong>
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
          {currentStep !== DiagnosisStep.PROCESSING && currentStep !== DiagnosisStep.CONFIRMED && (
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
