"use client"

import type React from "react"
import { Icon } from "./Icon"
import { useLanguage } from "../contexts/LanguageContext"
import { AppView } from "../types"

interface FooterProps {
  onNavigate: (view: AppView) => void
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { translate } = useLanguage()

  const footerLinks = {
    services: [
      { label: translate("nav.virtualDiagnosis"), view: AppView.VIRTUAL_DIAGNOSIS },
      { label: translate("nav.batteryPrediction"), view: AppView.BATTERY_PREDICTION },
      { label: translate("nav.sparesHunter"), view: AppView.SPARES_HUNTER },
      { label: translate("nav.obdInfo"), view: AppView.OBD_INFO },
    ],
    company: [
      { label: translate("nav.aboutUs"), view: AppView.ABOUT },
      { label: translate("nav.community"), view: AppView.COMMUNITY },
      { label: translate("nav.garageSolutions"), view: AppView.GARAGE_SOLUTIONS },
    ],
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Icon name="car" size={32} className="text-blue-400 mr-2" />
              <span className="text-xl font-bold">SmartGarage</span>
            </div>
            <p className="text-gray-300 mb-4">
              AI-powered care for your electric and hybrid vehicles across Africa. Connecting vehicle owners with expert
              mechanics and genuine parts.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-gray-300">
                <Icon name="mail" size={16} className="mr-2" />
                <span>info@smartgarage.live</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Icon name="phone" size={16} className="mr-2" />
                <span>+250 788 200 395</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.view}>
                  <button
                    onClick={() => onNavigate(link.view)}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.view}>
                  <button
                    onClick={() => onNavigate(link.view)}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button className="text-gray-300 hover:text-white transition-colors">Privacy Policy</button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors">Terms of Service</button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 SmartGarage. All rights reserved. Made By Lievin for African EV owners.</p>
        </div>
      </div>
    </footer>
  )
}
