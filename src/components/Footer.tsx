'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  QuestionMarkCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "What age groups does the platform support?",
    answer: "Our platform is designed for K-12 students, covering Elementary (ages 5-10), Middle School (ages 11-13), and High School (ages 14-18)."
  },
  {
    question: "How do I enroll my child in a course?",
    answer: "Parents can browse available courses, select the appropriate grade level and subject, and enroll their child through our simple registration process. You'll need to create a parent account first."
  },
  {
    question: "What subjects are available?",
    answer: "We offer a comprehensive curriculum including Mathematics, Science, Language Arts, Social Studies, Art, Music, and Physical Education. Each subject is tailored to different grade levels."
  },
  {
    question: "How do teachers interact with students?",
    answer: "Teachers provide interactive lessons, assignments, and feedback through our platform. They can track student progress, provide personalized guidance, and communicate with parents about their child's development."
  },
  {
    question: "Is there a mobile app available?",
    answer: "Yes! Our platform is fully accessible through web browsers and we have dedicated mobile apps for both iOS and Android devices, making learning possible anywhere."
  },
  {
    question: "How do you ensure student safety?",
    answer: "We prioritize student safety with secure login systems, monitored interactions, and strict privacy policies. All content is age-appropriate and our platform complies with COPPA regulations."
  }
]

export default function Footer() {
  const pathname = usePathname()
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  // Don't show FAQ section on chat page
  const isChatPage = pathname === '/chat'

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the form submission
    console.log('Contact form submitted:', contactForm)
    setShowContactForm(false)
    setContactForm({ name: '', email: '', subject: '', message: '' })
    alert('Thank you for your message! We will get back to you soon.')
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Navigation Links */}
        <div className="flex justify-center space-x-8 mb-8">
          <Link href="/about" className="text-gray-300 hover:text-white">
            About
          </Link>
          <Link href="/courses" className="text-gray-300 hover:text-white">
            Courses
          </Link>
          <Link href="/chat" className="text-gray-300 hover:text-white">
            Chat
          </Link>
          <Link href="/faq" className="text-gray-300 hover:text-white flex items-center">
            <QuestionMarkCircleIcon className="h-5 w-5 mr-1" />
            FAQ
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-white">
            Contact
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Our Platform</h3>
            <p className="text-gray-300">
              A comprehensive K-12 educational platform designed to provide engaging and interactive learning experiences for students of all ages.
            </p>
          </div>

          {/* FAQ Section - Only show if not on chat page */}
          {!isChatPage && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-700 pb-4">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="flex justify-between items-center w-full text-left"
                    >
                      <span className="font-medium">{faq.question}</span>
                      <QuestionMarkCircleIcon className={`h-5 w-5 transform transition-transform ${
                        openFaqIndex === index ? 'rotate-180' : ''
                      }`} />
                    </button>
                    {openFaqIndex === index && (
                      <p className="mt-2 text-gray-300">{faq.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-indigo-400" />
                <a href="mailto:support@edtech-platform.com" className="text-gray-300 hover:text-white">
                  support@edtech-platform.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-indigo-400" />
                <a href="tel:+1-555-0123" className="text-gray-300 hover:text-white">
                  (555) 012-3456
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPinIcon className="h-5 w-5 text-indigo-400" />
                <span className="text-gray-300">
                  123 Education Street, Learning City, ED 12345
                </span>
              </div>
              <button
                onClick={() => setShowContactForm(true)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send us a Message
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} EdTech Platform. All rights reserved.</p>
        </div>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Contact Us</h3>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    required
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </footer>
  )
} 