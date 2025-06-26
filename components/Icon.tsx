import type React from "react"
import {
  Car,
  Battery,
  Wrench,
  Users,
  Scan,
  Building2,
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  User,
  LogOut,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Star,
  Check,
  AlertCircle,
  Info,
  Upload,
  Search,
  Plus,
  Minus,
  Edit,
  Trash2,
  Settings,
  Home,
  MessageCircle,
  Heart,
  Share2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Calendar,
  Clock,
  Download,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  Loader2,
} from "lucide-react"

const iconMap = {
  // Vehicle & Service Icons
  car: Car,
  diagnostic: Car,
  battery: Battery,
  parts: Wrench,
  community: Users,
  obd: Scan,
  garage: Building2,

  // UI Icons
  menu: Menu,
  x: X,
  sun: Sun,
  moon: Moon,
  globe: Globe,
  user: User,
  logout: LogOut,

  // Navigation Icons
  "chevron-down": ChevronDown,
  "chevron-up": ChevronUp,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "arrow-right": ArrowRight,
  "arrow-left": ArrowLeft,

  // Contact Icons
  mail: Mail,
  phone: Phone,
  "map-pin": MapPin,

  // Status Icons
  star: Star,
  check: Check,
  "alert-circle": AlertCircle,
  info: Info,

  // Action Icons
  upload: Upload,
  search: Search,
  plus: Plus,
  minus: Minus,
  edit: Edit,
  trash: Trash2,
  settings: Settings,

  // Content Icons
  home: Home,
  "message-circle": MessageCircle,
  heart: Heart,
  share: Share2,
  eye: Eye,
  "eye-off": EyeOff,
  lock: Lock,
  unlock: Unlock,

  // Time Icons
  calendar: Calendar,
  clock: Clock,

  // Misc Icons
  download: Download,
  "external-link": ExternalLink,
  loader: Loader2,
}

export type IconName = keyof typeof iconMap

interface IconProps {
  name: IconName
  size?: number
  className?: string
}

export const Icon: React.FC<IconProps> = ({ name, size = 20, className = "" }) => {
  const IconComponent = iconMap[name]

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  return <IconComponent size={size} className={className} />
}
