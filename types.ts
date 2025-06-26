export enum AppView {
  LANDING = "LANDING",
  VIRTUAL_DIAGNOSIS = "VIRTUAL_DIAGNOSIS",
  BATTERY_PREDICTION = "BATTERY_PREDICTION",
  SPARES_HUNTER = "SPARES_HUNTER",
  OBD_INFO = "OBD_INFO",
  GARAGE_SOLUTIONS = "GARAGE_SOLUTIONS",
  COMMUNITY = "COMMUNITY",
  AUTH = "AUTH",
  ABOUT = "ABOUT",
  DASHBOARD = "DASHBOARD",
  ADMIN = "ADMIN",
}

export enum AuthStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  AUTHENTICATED = "AUTHENTICATED",
  UNAUTHENTICATED = "UNAUTHENTICATED",
}

export enum DiagnosisStep {
  PRICING_INFO = "PRICING_INFO",
  VEHICLE_DETAILS = "VEHICLE_DETAILS",
  ISSUE_DESCRIPTION = "ISSUE_DESCRIPTION",
  PROCESSING = "PROCESSING",
  REVIEW_INFORMATION = "REVIEW_INFORMATION",
  E_MECHANIC_PROCESS = "E_MECHANIC_PROCESS",
  CONTACT = "CONTACT",
  PAYMENT = "PAYMENT",
  CONFIRMED = "CONFIRMED",
}

export enum BatteryPredictionStep {
  PRICING_INFO = "PRICING_INFO",
  VEHICLE_USAGE = "VEHICLE_USAGE",
  PRELIMINARY_INSIGHT = "PRELIMINARY_INSIGHT",
  CONTACT_INFO = "CONTACT_INFO",
  PAYMENT = "PAYMENT",
  CONFIRMATION = "CONFIRMATION",
}

export enum SparesStep {
  PART_DETAILS = "PART_DETAILS",
  CONTACT_INFO = "CONTACT_INFO",
  CONFIRMATION = "CONFIRMATION",
}

export interface UserProfile {
  id: string
  full_name: string
  email: string
  is_admin?: boolean
  created_at?: string
}

export interface VehicleDetails {
  brand: string
  model: string
  vin?: string
}

export interface IssueDescription {
  description: string
  photo?: File
}

export interface ContactInfo {
  email: string
  phone: string
}

export interface StructuredDiagnosisReport {
  vehicleInfo: VehicleDetails
  issueDescription: string
  hasPhoto: boolean
  timestamp: string
  status: string
  nextSteps: string[]
}

export interface DiagnosisRequest {
  id?: string
  user_id?: string
  vehicle_brand: string
  vehicle_model: string
  vin?: string
  issue_description: string
  photo_url?: string
  contact_email: string
  contact_phone: string
  diagnosis_report: StructuredDiagnosisReport
  payment_status?: string
  amount_paid?: number
  created_at?: string
}

export interface BatteryRequest {
  id?: string
  user_id?: string
  car_model: string
  current_mileage: number
  average_driving_distance: number
  charging_method: string
  contact_email: string
  contact_phone: string
  payment_status?: string
  amount_paid?: number
  created_at?: string
}

export interface SparePartRequest {
  id?: string
  user_id?: string
  part_description: string
  car_brand?: string
  car_model?: string
  photo_url?: string
  contact_email: string
  contact_phone: string
  created_at?: string
}

export interface OBDProduct {
  id: string
  name: string
  description: string
  price: string
  price_rwf: number
  price_usd: number
  features: string[]
  image: string
  in_stock: boolean
}

export interface OBDInquiry {
  id?: string
  user_id?: string
  product_id: string
  product_name: string
  user_name: string
  email: string
  phone: string
  message?: string
  created_at?: string
}

export interface GarageDemoRequest {
  id?: string
  user_id?: string
  user_name: string
  garage_name: string
  email: string
  phone?: string
  created_at?: string
}

export interface CommunityPost {
  id?: string
  user_id: string
  content: string
  created_at?: string
  author_name?: string
  author_email?: string
}

export interface ContactInquiry {
  id?: string
  name: string
  email: string
  message: string
  created_at?: string
}

export interface SmartCarReminder {
  id?: string
  user_id: string
  title: string
  message: string
  reminder_type: "maintenance" | "inspection" | "service" | "general"
  due_date?: string
  is_read: boolean
  created_at?: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface Testimonial {
  name: string
  location: string
  quote: string
  avatar: string
  rating: number
}

export interface ServiceCard {
  icon: string
  title: string
  description: string
  price: string
  ctaText: string
  view: AppView
}

export interface PricingPlan {
  name: string
  price_rwf: number
  price_usd: number
  features: string[]
  popular?: boolean
}
