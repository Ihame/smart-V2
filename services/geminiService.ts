import type { StructuredDiagnosisReport, VehicleDetails } from "../types"

// Simulated Gemini service - does NOT make real API calls
export const getVirtualDiagnosis = async (
  vehicleDetails: VehicleDetails,
  issueDescription: string,
  hasPhoto: boolean,
): Promise<StructuredDiagnosisReport> => {
  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Return predefined structured report
  const report: StructuredDiagnosisReport = {
    vehicleInfo: vehicleDetails,
    issueDescription,
    hasPhoto,
    timestamp: new Date().toISOString(),
    status: "Information Collected - E-Mechanic Review Pending",
    nextSteps: [
      "Your vehicle information and issue description have been successfully collected",
      "A certified e-mechanic will review your case within 24 hours",
      "You will be contacted via your provided contact information",
      "Full diagnosis and service recommendations will be provided",
      "Please note that comprehensive diagnosis and repair services involve fees",
    ],
  }

  return report
}

// Note: API_KEY would be sourced from process.env.API_KEY if real API calls were needed
// const API_KEY = process.env.API_KEY;
