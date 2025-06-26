"use client"

import type React from "react"
import { Button } from "../Button"
import { Icon } from "../Icon"
import { ServiceCard } from "../ServiceCard"
import { useLanguage } from "../../contexts/LanguageContext"
import { useAuth } from "../../contexts/AuthContext"
import { AppView, AuthStatus } from "../../types"
import { SERVICE_CARDS, TESTIMONIALS } from "../../constants"

interface LandingPageProps {
  onNavigate: (view: AppView) => void
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { translate } = useLanguage()
  const { authStatus } = useAuth()

  const stats = [
    { label: translate("stats.evsServiced"), value: "5,200+", icon: "car" },
    { label: translate("stats.happyOwners"), value: "3,800+", icon: "users" },
    { label: translate("stats.partsSourced"), value: "12,000+", icon: "parts" },
    { label: translate("stats.avgResponseTime"), value: "< 1hr", icon: "clock" },
  ]

  const features = [
    {
      icon: "diagnostic",
      title: "AI-Powered Diagnostics",
      description:
        "Advanced artificial intelligence analyzes your vehicle's symptoms and provides instant preliminary diagnosis",
    },
    {
      icon: "user",
      title: "Certified E-Mechanics",
      description:
        "Expert mechanics specialized in EV and hybrid systems provide professional consultation and solutions",
    },
    {
      icon: "battery",
      title: "Battery Health Monitoring",
      description: "Comprehensive battery analysis with predictive maintenance recommendations to extend battery life",
    },
    {
      icon: "parts",
      title: "Genuine Parts Network",
      description: "Access to authentic spare parts from verified suppliers across Africa with quality guarantee",
    },
    {
      icon: "clock",
      title: "24/7 Support",
      description: "Round-the-clock emergency support for critical vehicle issues with rapid response guarantee",
    },
    {
      icon: "settings",
      title: "Smart Reminders",
      description:
        "Intelligent maintenance reminders and technical inspection alerts to keep your vehicle in perfect condition",
    },
  ]

  const benefits = [
    { icon: "check", text: "Save up to 60% on diagnostic costs" },
    { icon: "check", text: "Get expert advice within 1 hour" },
    { icon: "check", text: "Access to rare EV/Hybrid parts" },
    { icon: "check", text: "Predictive maintenance alerts" },
    { icon: "check", text: "Money-back guarantee" },
    { icon: "check", text: "Multi-language support" },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 dark:from-blue-800 dark:to-purple-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Icon name="star" size={16} className="text-yellow-400 mr-2" />
              <span className="text-sm font-medium">Trusted by 5,000+ EV owners across Africa</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">{translate("landing.hero.title")}</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto leading-relaxed">
              {translate("landing.hero.subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                onClick={() => onNavigate(AppView.VIRTUAL_DIAGNOSIS)}
                className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Icon name="diagnostic" size={20} className="mr-2" />
                {translate("landing.hero.startDiagnosis")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate(AppView.OBD_INFO)}
                className="border-white text-white hover:bg-white hover:text-blue-600 shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Icon name="obd" size={20} className="mr-2" />
                {translate("landing.hero.exploreOBD")}
              </Button>
            </div>

            {/* Quick Access for Logged In Users */}
            {authStatus === AuthStatus.AUTHENTICATED && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
                <p className="text-sm mb-3">Quick Access:</p>
                <Button
                  onClick={() => onNavigate(AppView.DASHBOARD)}
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  <Icon name="user" size={16} className="mr-2" />
                  My Dashboard
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" fill="none" className="w-full h-12 font-medium">
            <path
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1200,160,1248,128,1296,112L1344,96L1344,200L1296,200C1248,200,1152,200,1056,200C960,200,864,200,768,200C672,200,576,200,480,200C384,200,288,200,192,200C96,200,48,200,24,200L0,200Z"
              fill="currentColor"
              className="text-white dark:text-gray-900"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  <Icon name={stat.icon as any} size={24} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose SmartGarage?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We combine cutting-edge AI technology with expert human knowledge to provide unmatched EV and hybrid
              vehicle care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-6">
                  <Icon name={feature.icon as any} size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Our Premium Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Professional-grade solutions for every aspect of your electric and hybrid vehicle needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICE_CARDS.map((service, index) => (
              <ServiceCard key={index} service={service} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Save Time, Money & Stress</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <Icon name={benefit.icon as any} size={20} className="text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-blue-100">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Ready to Get Started?</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Virtual Diagnosis</span>
                  <span className="font-bold">10,000 RWF</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>AI Battery Prediction</span>
                  <span className="font-bold">15,000 RWF</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Spares Hunter</span>
                  <span className="font-bold text-green-400">FREE</span>
                </div>
                <hr className="border-white/20" />
                <Button
                  onClick={() => onNavigate(AppView.VIRTUAL_DIAGNOSIS)}
                  className="w-full bg-white text-blue-600 hover:bg-gray-100"
                  size="lg"
                >
                  Start Your Diagnosis Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands of satisfied EV and hybrid vehicle owners across Africa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Icon key={i} name="star" size={16} />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Join Africa's Leading EV Community</h2>
          <p className="text-xl mb-8 text-blue-100">
            Get instant access to expert diagnostics, genuine parts, and a community of EV enthusiasts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => onNavigate(authStatus === AuthStatus.AUTHENTICATED ? AppView.DASHBOARD : AppView.AUTH)}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Icon name="user" size={20} className="mr-2" />
              {authStatus === AuthStatus.AUTHENTICATED ? "Go to Dashboard" : "Create Free Account"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate(AppView.COMMUNITY)}
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Icon name="users" size={20} className="mr-2" />
              Join Community
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
