"use client"

import type React from "react"
import type { OBDProduct } from "../types"
import { Button } from "./Button"
import { useLanguage } from "../contexts/LanguageContext"

const fallbackProduct: OBDProduct = {
  id: "placeholder",
  name: "OBD Scanner",
  description: "Product data not supplied.",
  price: "—",
  features: [],
  image: "/placeholder.svg?height=200&width=300",
}

interface ProductCardProps {
  product?: OBDProduct
  onRequestInfo?: (product: OBDProduct) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onRequestInfo }) => {
  const { translate } = useLanguage()
  const item = product ?? fallbackProduct

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-3">{item.description}</p>
        <div className="mb-3">
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{item.price}</p>
        </div>
        {item.features.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Features:</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              {item.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
        <Button onClick={() => onRequestInfo?.(item)} className="w-full">
          Request Info
        </Button>
      </div>
    </div>
  )
}
