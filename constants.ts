import { AppView, type FAQ, type OBDProduct, type ServiceCard, type Testimonial, type PricingPlan } from "./types"

export const CAR_BRANDS_MODELS = {
  // Japanese Brands
  Toyota: [
    "Prius",
    "Camry Hybrid",
    "RAV4 Hybrid",
    "Highlander Hybrid",
    "Corolla Hybrid",
    "Avalon Hybrid",
    "Venza",
    "Sienna Hybrid",
  ],
  Honda: ["Insight", "Accord Hybrid", "CR-V Hybrid", "Pilot Hybrid", "Clarity", "HR-V Hybrid"],
  Nissan: ["Leaf", "Altima", "Rogue Hybrid", "Pathfinder Hybrid", "Kicks e-Power", "Note e-Power", "Ariya"],
  Mazda: ["CX-30 Hybrid", "CX-5 Hybrid", "MX-30", "CX-60 Hybrid", "CX-90 Hybrid"],
  Subaru: ["Crosstrek Hybrid", "Forester Hybrid", "Outback Hybrid", "Solterra"],
  Mitsubishi: ["Outlander PHEV", "Eclipse Cross PHEV", "i-MiEV"],
  Suzuki: ["Swift Hybrid", "Vitara Hybrid", "S-Cross Hybrid"],
  Lexus: ["ES Hybrid", "RX Hybrid", "NX Hybrid", "UX Hybrid", "LS Hybrid", "LC Hybrid"],
  Infiniti: ["QX60 Hybrid", "Q50 Hybrid", "QX50 Hybrid"],
  Acura: ["MDX Hybrid", "RLX Hybrid", "NSX Hybrid"],

  // Korean Brands
  Hyundai: [
    "Ioniq",
    "Ioniq 5",
    "Ioniq 6",
    "Sonata Hybrid",
    "Tucson Hybrid",
    "Santa Fe Hybrid",
    "Elantra Hybrid",
    "Kona Electric",
  ],
  Kia: ["Niro", "Niro EV", "EV6", "Optima Hybrid", "Sorento Hybrid", "Sportage Hybrid", "Soul EV", "Stinger Hybrid"],
  Genesis: ["GV70 Hybrid", "G90 Hybrid", "Electrified GV70"],

  // German Brands
  BMW: ["i3", "i4", "i7", "i8", "iX", "X5 xDrive40e", "330e", "530e", "745e", "X3 xDrive30e"],
  Mercedes: ["EQC", "EQS", "EQE", "EQA", "EQB", "C350e", "E350e", "S550e", "GLE Hybrid", "GLC Hybrid"],
  Audi: ["e-tron", "e-tron GT", "Q4 e-tron", "A3 e-tron", "Q5 TFSI e", "A6 Hybrid", "A7 Hybrid", "A8 Hybrid"],
  Volkswagen: ["ID.3", "ID.4", "ID.5", "e-Golf", "Passat GTE", "Touareg Hybrid", "Tiguan Hybrid"],
  Porsche: ["Taycan", "Cayenne Hybrid", "Panamera Hybrid", "Macan Hybrid"],
  Mini: ["Cooper SE", "Countryman Hybrid"],

  // American Brands
  Tesla: ["Model S", "Model 3", "Model X", "Model Y", "Cybertruck", "Roadster"],
  Ford: ["Mustang Mach-E", "F-150 Lightning", "Escape Hybrid", "Explorer Hybrid", "Fusion Hybrid", "Maverick Hybrid"],
  Chevrolet: ["Bolt EV", "Bolt EUV", "Volt", "Malibu Hybrid", "Tahoe Hybrid", "Silverado Hybrid"],
  Cadillac: ["Lyriq", "CT6 Hybrid", "Escalade Hybrid"],
  GMC: ["Hummer EV", "Sierra Hybrid", "Yukon Hybrid"],
  Chrysler: ["Pacifica Hybrid"],
  Jeep: ["Wrangler 4xe", "Grand Cherokee 4xe", "Compass 4xe"],
  Dodge: ["Hornet Hybrid"],
  Lincoln: ["Aviator Hybrid", "Corsair Hybrid"],

  // French Brands
  Renault: ["Zoe", "Megane E-Tech", "Captur E-Tech", "Arkana E-Tech", "Scenic E-Tech"],
  Peugeot: ["e-208", "e-2008", "3008 Hybrid", "508 Hybrid", "e-Partner"],
  Citroën: ["C4", "C5 Aircross Hybrid", "Berlingo Electric"],
  DS: ["DS 3 Crossback E-Tense", "DS 7 Crossback E-Tense", "DS 9 E-Tense"],

  // Italian Brands
  Fiat: ["500e", "Panda Hybrid", "Tipo Hybrid"],
  AlfaRomeo: ["Tonale Hybrid", "Giulia Hybrid"],
  Maserati: ["MC20", "Ghibli Hybrid", "Levante Hybrid"],
  Ferrari: ["SF90 Stradale", "296 GTB", "LaFerrari"],
  Lamborghini: ["Sián", "Countach LPI 800-4", "Revuelto"],

  // British Brands
  Jaguar: ["I-PACE", "XE Hybrid", "XF Hybrid", "F-PACE Hybrid"],
  LandRover: ["Range Rover Hybrid", "Range Rover Sport Hybrid", "Discovery Hybrid", "Defender Hybrid"],
  Bentley: ["Bentayga Hybrid", "Flying Spur Hybrid"],
  RollsRoyce: ["Cullinan Hybrid", "Ghost Hybrid"],
  McLaren: ["Artura", "P1"],
  AstonMartin: ["DBX Hybrid", "Vantage Hybrid"],

  // Swedish Brands
  Volvo: ["XC90 Hybrid", "XC60 Hybrid", "S90 Hybrid", "V90 Hybrid", "XC40 Recharge", "C40 Recharge"],
  Polestar: ["Polestar 1", "Polestar 2", "Polestar 3", "Polestar 4"],

  // Chinese Brands
  BYD: ["Tang", "Song", "Qin", "Han", "Atto 3", "Seal"],
  NIO: ["ES8", "ES6", "EC6", "ET7", "ET5"],
  Xpeng: ["P7", "G3", "P5", "G9"],
  Li: ["Li ONE", "Li L9", "Li L8", "Li L7"],
  Geely: ["Geometry A", "Geometry C", "Emgrand EV"],
  MG: ["ZS EV", "HS Hybrid", "5 EV", "4 EV"],
  Lynk: ["01 Hybrid", "02 Hybrid", "03 Hybrid"],

  // Indian Brands
  Tata: ["Nexon EV", "Tigor EV", "Harrier Hybrid"],
  Mahindra: ["eXUV300", "eKUV100", "XUV400"],

  // Other Notable Brands
  Lucid: ["Air Dream", "Air Touring", "Air Pure"],
  Rivian: ["R1T", "R1S", "EDV"],
  Fisker: ["Ocean", "PEAR"],
  Canoo: ["LDV", "MPDV", "Pickup"],
  Lordstown: ["Endurance"],
  Faraday: ["FF 91"],
}

export const CHARGING_METHODS = [
  "Home AC Charging (Level 1)",
  "Home AC Charging (Level 2)",
  "Public AC Charging",
  "DC Fast Charging",
  "Workplace Charging",
  "Mixed Charging Methods",
]

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Virtual Diagnosis",
    price_rwf: 10000,
    price_usd: 7,
    features: [
      "AI-powered initial analysis",
      "Certified e-mechanic consultation",
      "Detailed diagnostic report",
      "24-hour response guarantee",
      "Follow-up support",
    ],
  },
  {
    name: "AI Battery Prediction",
    price_rwf: 15000,
    price_usd: 11,
    features: [
      "Advanced AI battery analysis",
      "Lifespan prediction modeling",
      "Performance optimization tips",
      "Maintenance schedule",
      "Expert recommendations",
    ],
    popular: true,
  },
]

export const SAMPLE_OBD_PRODUCTS: OBDProduct[] = [
  {
    id: "obd-1",
    name: "SmartScan Pro EV",
    description: "Advanced OBD scanner specifically designed for electric and hybrid vehicles",
    price: "85,000 RWF ($60 USD)",
    price_rwf: 85000,
    price_usd: 60,
    features: ["EV Battery Diagnostics", "Hybrid System Analysis", "Real-time Data", "Mobile App Integration"],
    image: "/placeholder.svg?height=200&width=300",
    in_stock: true,
  },
  {
    id: "obd-2",
    name: "HybridCheck Elite",
    description: "Professional-grade diagnostic tool for hybrid vehicle maintenance",
    price: "425,000 RWF ($299 USD)",
    price_rwf: 425000,
    price_usd: 299,
    features: ["Hybrid Battery Health", "Motor Performance", "Energy Flow Analysis", "Fault Code Reading"],
    image: "/placeholder.svg?height=200&width=300",
    in_stock: true,
  },
  {
    id: "obd-3",
    name: "EcoScan Universal",
    description: "Universal OBD scanner compatible with most EV and hybrid models",
    price: "212,000 RWF ($149 USD)",
    price_rwf: 212000,
    price_usd: 149,
    features: ["Multi-brand Support", "Basic Diagnostics", "Code Clearing", "Live Data Stream"],
    image: "/placeholder.svg?height=200&width=300",
    in_stock: false,
  },
]

export const SAMPLE_FAQS: FAQ[] = [
  {
    question: "What types of vehicles does SmartGarage support?",
    answer:
      "SmartGarage specializes in electric vehicles (EVs) and hybrid vehicles from all major manufacturers including Toyota, Honda, Nissan, BMW, Tesla, and more.",
  },
  {
    question: "How accurate is the virtual diagnosis?",
    answer:
      "Our virtual diagnosis combines AI analysis with certified e-mechanic expertise, providing 95% accuracy for initial assessments. Full diagnosis includes a money-back guarantee if our recommendations don't resolve your issue.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Mobile Money (MTN, Airtel), bank transfers, Visa/Mastercard, and cash payments at partner locations across Rwanda.",
  },
  {
    question: "Do you provide services outside Rwanda?",
    answer:
      "Currently, SmartGarage primarily serves Rwanda and surrounding East African regions. We are expanding our services to other African countries.",
  },
  {
    question: "What is included in the AI Battery Prediction service?",
    answer:
      "Our AI Battery Prediction includes comprehensive battery health analysis, lifespan prediction, performance optimization recommendations, maintenance scheduling, and ongoing monitoring support.",
  },
  {
    question: "How long does virtual diagnosis take?",
    answer:
      "Initial AI analysis is completed within minutes. Certified e-mechanic review and detailed report are provided within 24 hours, with urgent cases prioritized.",
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Jean Baptiste Uwimana",
    location: "Kigali, Rwanda",
    quote:
      "SmartGarage's virtual diagnosis saved me 200,000 RWF! They identified my Prius battery issue remotely and guided me to the exact solution. Outstanding service!",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
  {
    name: "Grace Mukamana",
    location: "Butare, Rwanda",
    quote:
      "The AI battery prediction was incredibly accurate. They predicted my hybrid battery would need replacement in 6 months - it happened exactly as they said. Now I trust them completely!",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
  {
    name: "David Nkurunziza",
    location: "Gisenyi, Rwanda",
    quote:
      "As a garage owner, the SmartGarage ERP system transformed our business. We increased efficiency by 40% and customer satisfaction is at an all-time high!",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
  {
    name: "Marie Claire Ingabire",
    location: "Musanze, Rwanda",
    quote:
      "Found rare Tesla Model 3 parts through their Spares Hunter service in just 2 days. Saved me weeks of searching and got genuine parts at fair prices!",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
]

export const SERVICE_CARDS: ServiceCard[] = [
  {
    icon: "diagnostic",
    title: "Virtual Diagnosis",
    description: "AI-powered vehicle diagnosis with certified e-mechanic consultation",
    price: "10,000 RWF ($7 USD)",
    ctaText: "Start Diagnosis",
    view: AppView.VIRTUAL_DIAGNOSIS,
  },
  {
    icon: "battery",
    title: "AI Battery Prediction",
    description: "Advanced AI analysis of your EV/Hybrid battery lifespan and health",
    price: "15,000 RWF ($11 USD)",
    ctaText: "Analyze Battery",
    view: AppView.BATTERY_PREDICTION,
  },
  {
    icon: "parts",
    title: "Spares Hunter",
    description: "Find genuine spare parts for your electric or hybrid vehicle",
    price: "Free Service",
    ctaText: "Find Parts",
    view: AppView.SPARES_HUNTER,
  },
  {
    icon: "community",
    title: "Community Hub",
    description: "Connect with other EV owners and share experiences",
    price: "Free Service",
    ctaText: "Join Community",
    view: AppView.COMMUNITY,
  },
  {
    icon: "obd",
    title: "OBD Scanners",
    description: "Professional OBD diagnostic tools for sale",
    price: "From 50,000 RWF",
    ctaText: "Shop Now",
    view: AppView.OBD_INFO,
  },
  {
    icon: "garage",
    title: "Garage ERP",
    description: "Complete management system for garage operations",
    price: "Enterprise Solution",
    ctaText: "Request Demo",
    view: AppView.GARAGE_SOLUTIONS,
  },
]

export const TRANSLATIONS = {
  en: {
    // Navigation
    "nav.virtualDiagnosis": "Virtual Diagnosis",
    "nav.batteryPrediction": "Battery Prediction",
    "nav.sparesHunter": "Spares Hunter",
    "nav.obdInfo": "OBD Scanners",
    "nav.garageSolutions": "Garage ERP",
    "nav.community": "Community",
    "nav.aboutUs": "About Us",
    "nav.dashboard": "Dashboard",
    "nav.login": "Login",
    "nav.logout": "Logout",
    "nav.myProfile": "My Profile",

    // Landing Page
    "landing.hero.title": "Africa's #1 Smart EV Care Platform",
    "landing.hero.subtitle":
      "AI-powered diagnostics, expert mechanics, and genuine parts for your electric and hybrid vehicles",
    "landing.hero.startDiagnosis": "Start Diagnosis - 10,000 RWF",
    "landing.hero.exploreOBD": "Shop OBD Scanners",

    // Stats
    "stats.evsServiced": "EVs Serviced",
    "stats.happyOwners": "Happy Owners",
    "stats.partsSourced": "Parts Sourced",
    "stats.avgResponseTime": "Avg. Response Time",

    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.success": "Success!",
    "common.cancel": "Cancel",
    "common.submit": "Submit",
    "common.next": "Next",
    "common.back": "Back",
    "common.close": "Close",
    "common.email": "Email",
    "common.phone": "Phone",
    "common.name": "Name",
    "common.message": "Message",
    "common.payNow": "Pay Now",
    "common.proceedToPayment": "Proceed to Payment",

    // Forms
    "form.required": "This field is required",
    "form.invalidEmail": "Please enter a valid email address",
    "form.invalidPhone": "Please enter a valid phone number",

    // Auth
    "auth.login": "Login",
    "auth.register": "Register",
    "auth.fullName": "Full Name",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.passwordMismatch": "Passwords do not match",

    // Virtual Diagnosis
    "diagnosis.title": "Virtual Diagnosis",
    "diagnosis.pricingInfo": "Service Pricing",
    "diagnosis.vehicleDetails": "Vehicle Details",
    "diagnosis.issueDescription": "Issue Description",
    "diagnosis.processing": "Processing your information...",
    "diagnosis.reviewInfo": "Review Information",
    "diagnosis.eMechanicProcess": "E-Mechanic Process",
    "diagnosis.contact": "Contact Information",
    "diagnosis.payment": "Payment",
    "diagnosis.confirmed": "Diagnosis Request Confirmed",

    // Battery Prediction
    "battery.title": "AI Battery Prediction",
    "battery.pricingInfo": "Service Pricing",
    "battery.vehicleUsage": "Vehicle & Usage Details",
    "battery.preliminaryInsight": "Preliminary Insight",
    "battery.contactInfo": "Contact Information",
    "battery.payment": "Payment",
    "battery.confirmation": "Request Confirmed",

    // Dashboard
    "dashboard.title": "My Dashboard",
    "dashboard.welcome": "Welcome back",
    "dashboard.smartCarReminders": "Smart Car Reminders",
    "dashboard.recentServices": "Recent Services",
    "dashboard.quickActions": "Quick Actions",

    // Community
    "community.title": "Community Hub",
    "community.shareThoughts": "Share your thoughts...",
    "community.loginToEngage": "Login to engage with the community",
    "community.noPostsYet": "No posts yet. Be the first to share!",

    // About
    "about.title": "About SmartGarage",
    "about.whoWeAre": "Who We Are",
    "about.ourMission": "Our Mission",
    "about.ourVision": "Our Values",
    "about.ourValues": "Our Values",
    "about.faq": "Frequently Asked Questions",
    "about.contactUs": "Contact Us",
  },
  rw: {
    // Navigation (Kinyarwanda translations)
    "nav.virtualDiagnosis": "Isuzuma rya Viritual",
    "nav.batteryPrediction": "Guhanura Bateri",
    "nav.sparesHunter": "Gushaka Ibice",
    "nav.obdInfo": "OBD Scanners",
    "nav.garageSolutions": "Garage ERP",
    "nav.community": "Umuryango",
    "nav.aboutUs": "Ibibacu",
    "nav.dashboard": "Dashboard",
    "nav.login": "Kwinjira",
    "nav.logout": "Gusohoka",
    "nav.myProfile": "Umwirondoro wanjye",

    // Landing Page
    "landing.hero.title": "Urubuga rwa mbere rw'ubwiyunge bw'imodoka za EV muri Afurika",
    "landing.hero.subtitle":
      "Isuzuma rishingiye ku bwenge bwubuhanga, abanyamyuga b'imodoka, n'ibice byemewe by'imodoka zawe z'amashanyarazi na hybrid",
    "landing.hero.startDiagnosis": "Tangira Isuzuma - 10,000 RWF",
    "landing.hero.exploreOBD": "Gura OBD Scanners",

    // Add more Kinyarwanda translations as needed...
    "common.loading": "Birategerezwa...",
    "common.error": "Habaye ikosa",
    "common.success": "Byagenze neza!",
    "common.cancel": "Kuraguza",
    "common.submit": "Kohereza",
    "common.next": "Ibikurikira",
    "common.back": "Gusubira inyuma",
    "common.close": "Gufunga",
    "common.email": "Imeli",
    "common.phone": "Telefoni",
    "common.name": "Izina",
    "common.message": "Ubutumwa",
    "common.payNow": "Kwishyura Ubu",
    "common.proceedToPayment": "Komeza ku Kwishyura",
  },
}
