"use client"

import type React from "react"
import type { ServiceCard as ServiceCardType } from "../types"
import { Button } from "./Button"
import { Icon } from "./Icon"
import { useLanguage } from "../contexts/LanguageContext"

interface ServiceCardProps {
  service: ServiceCardType
  onNavigate: (view: ServiceCardType["view"]) => void
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onNavigate }) => {
  const { translate } = useLanguage()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
          <Icon name={service.icon as any} size={24} className="text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{service.title}</h3>
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{service.price}</p>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
      <Button onClick={() => onNavigate(service.view)} className="w-full">
        {service.ctaText}
      </Button>
    </div>
  )
}
