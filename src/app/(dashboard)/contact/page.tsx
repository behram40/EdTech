'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setSubmitStatus('success')
    setIsSubmitting(false)
    setFormData({ name: '', email: '', subject: '', message: '' })
    
    // Reset status after 3 seconds
    setTimeout(() => setSubmitStatus('idle'), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have questions or need assistance? We're here to help! Reach out to us through any of the following channels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <EnvelopeIcon className="h-6 w-6 text-indigo-600 mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Email</h3>
                  <p className="mt-1 text-sm text-gray-600">support@edtech-platform.com</p>
                  <p className="mt-1 text-sm text-gray-600">info@edtech-platform.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <PhoneIcon className="h-6 w-6 text-indigo-600 mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Phone</h3>
                  <p className="mt-1 text-sm text-gray-600">+1 (555) 123-4567</p>
                  <p className="mt-1 text-sm text-gray-600">Mon-Fri, 9am-5pm EST</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPinIcon className="h-6 w-6 text-indigo-600 mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Office</h3>
                  <p className="mt-1 text-sm text-gray-600">123 Education Street</p>
                  <p className="mt-1 text-sm text-gray-600">Boston, MA 02108</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <ClockIcon className="h-6 w-6 text-indigo-600 mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Hours</h3>
                  <p className="mt-1 text-sm text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p className="mt-1 text-sm text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
                  <p className="mt-1 text-sm text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-indigo-50 rounded-lg p-6"
          >
            <h3 className="text-lg font-medium text-indigo-900 mb-4">Need Immediate Assistance?</h3>
            <p className="text-indigo-700 mb-4">
              Our support team is available through the chat feature in your dashboard. Click the help button in the bottom right corner to start a conversation.
            </p>
            <a
              href="/dashboard"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
            >
              Go to Dashboard
              <PaperAirplaneIcon className="ml-2 h-4 w-4" />
            </a>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select a subject</option>
                <option value="technical">Technical Support</option>
                <option value="billing">Billing Question</option>
                <option value="course">Course Information</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </div>
                ) : submitStatus === 'success' ? (
                  'Message Sent!'
                ) : (
                  'Send Message'
                )}
              </button>
            </div>
            {submitStatus === 'success' && (
              <p className="text-sm text-green-600 text-center">
                Thank you for your message! We'll get back to you soon.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  )
} 