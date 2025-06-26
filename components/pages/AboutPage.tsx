"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../Button"
import { Icon } from "../Icon"
import { useLanguage } from "../../contexts/LanguageContext"
import { supabase } from "../../services/supabaseClient"
import { SAMPLE_FAQS } from "../../constants"

interface ContactForm {
  name: string
  email: string
  message: string
}

export const AboutPage: React.FC = () => {
  const { translate } = useLanguage()

  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setSubmitError("Please fill in all fields")
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase.from("contact_inquiries").insert([
        {
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
        },
      ])

      if (error) throw error

      setSubmitSuccess(true)
      setContactForm({ name: "", email: "", message: "" })
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (err) {
      setSubmitError("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index)
  }

  const values = [
    {
      icon: "heart",
      title: "Customer First",
      description: "We prioritize our customers' needs and satisfaction above all else",
    },
    {
      icon: "check",
      title: "Quality Excellence",
      description: "We maintain the highest standards in all our services and solutions",
    },
    {
      icon: "users",
      title: "Community Focus",
      description: "We believe in building strong communities around sustainable transportation",
    },
    {
      icon: "settings",
      title: "Innovation",
      description: "We continuously innovate to provide cutting-edge solutions for EV owners",
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{translate("about.title")}</h1>
          <p className="text-xl md:text-2xl text-blue-100">
            Empowering Africa's transition to sustainable transportation through intelligent vehicle care
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {translate("about.whoWeAre")}
              </h2>
              <div className="text-lg text-gray-600 dark:text-gray-300 space-y-4">
                <p>
                  SmartGarage is Rwanda's leading platform for electric and hybrid vehicle care, founded with the vision
                  of making sustainable transportation accessible and reliable across Africa.
                </p>
                <p>
                  We combine artificial intelligence, expert mechanical knowledge, and a deep understanding of the
                  African automotive landscape to provide comprehensive solutions for EV and hybrid vehicle owners.
                </p>
                <p>
                  From virtual diagnostics to spare parts sourcing, we're building the infrastructure that supports
                  Africa's green transportation future.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">2020</div>
                  <div className="text-gray-600 dark:text-gray-300">Founded</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">5+</div>
                  <div className="text-gray-600 dark:text-gray-300">Countries</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">50+</div>
                  <div className="text-gray-600 dark:text-gray-300">Partner Garages</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">24/7</div>
                  <div className="text-gray-600 dark:text-gray-300">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="heart" size={32} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{translate("about.ourMission")}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                To make electric and hybrid vehicle ownership accessible, reliable, and affordable across Africa through
                innovative technology and expert support.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="eye" size={32} className="text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{translate("about.ourVision")}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                To be Africa's leading platform for sustainable transportation, empowering millions to embrace clean
                mobility solutions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="star" size={32} className="text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{translate("about.ourValues")}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Innovation, sustainability, community, and excellence guide everything we do in serving our customers.
              </p>
            </div>
          </div>

          {/* Values Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name={value.icon as any} size={24} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EV & Hybrid Focus */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Focus on EV & Hybrid Batteries
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We specialize in the most critical component of electric and hybrid vehicles - the battery system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <Icon name="battery" size={32} className="text-green-600 dark:text-green-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Battery Health Monitoring</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Advanced diagnostics to monitor battery performance, capacity, and overall health status.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <Icon name="settings" size={32} className="text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Predictive Maintenance</h3>
              <p className="text-gray-600 dark:text-gray-300">
                AI-powered predictions to help you maintain optimal battery performance and extend lifespan.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <Icon name="wrench" size={32} className="text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Expert Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Certified technicians specialized in EV and hybrid battery systems provide expert guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {translate("about.faq")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Common questions about SmartGarage services</p>
          </div>

          <div className="space-y-4">
            {SAMPLE_FAQS.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                >
                  <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                  <Icon
                    name={expandedFAQ === index ? "chevron-up" : "chevron-down"}
                    size={20}
                    className="text-gray-500 dark:text-gray-400"
                  />
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {translate("about.contactUs")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Get in touch with our team</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Icon name="mail" size={20} className="text-blue-600 dark:text-blue-400 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300">info@smartgarage.rw</span>
                </div>
                <div className="flex items-center">
                  <Icon name="phone" size={20} className="text-blue-600 dark:text-blue-400 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300">+250 788 200 395</span>
                </div>
                <div className="flex items-center">
                  <Icon name="map-pin" size={20} className="text-blue-600 dark:text-blue-400 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300">Kigali, Rwanda</span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Business Hours</h4>
                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Emergency Support Only</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Send us a Message</h3>

              {submitSuccess && (
                <div className="mb-4 p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-md">
                  <div className="flex items-center">
                    <Icon name="check" size={20} className="text-green-600 dark:text-green-400 mr-2" />
                    <span className="text-green-700 dark:text-green-300">Message sent successfully!</span>
                  </div>
                </div>
              )}

              {submitError && (
                <div className="mb-4 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-md">
                  <div className="flex items-center">
                    <Icon name="alert-circle" size={20} className="text-red-600 dark:text-red-400 mr-2" />
                    <span className="text-red-700 dark:text-red-300">{submitError}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmitContact} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {translate("common.name")} *
                  </label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {translate("common.email")} *
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {translate("common.message")} *
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="How can we help you?"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Icon name="loader" size={16} className="mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Icon name="mail" size={16} className="mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
