'use client'

import { useState } from 'react'
import { QuestionMarkCircleIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqs: FAQItem[] = [
  {
    category: "Platform Information",
    question: "What age groups does the platform support?",
    answer: "Our platform is designed for K-12 students, covering Elementary (ages 5-10), Middle School (ages 11-13), and High School (ages 14-18)."
  },
  {
    category: "Platform Information",
    question: "What subjects are available?",
    answer: "We offer a comprehensive curriculum including Mathematics, Science, Language Arts, Social Studies, Art, Music, and Physical Education. Each subject is tailored to different grade levels."
  },
  {
    category: "Platform Information",
    question: "Is there a mobile app available?",
    answer: "Yes! Our platform is fully accessible through web browsers and we have dedicated mobile apps for both iOS and Android devices, making learning possible anywhere."
  },
  {
    category: "Enrollment & Registration",
    question: "How do I enroll my child in a course?",
    answer: "Parents can browse available courses, select the appropriate grade level and subject, and enroll their child through our simple registration process. You'll need to create a parent account first."
  },
  {
    category: "Teaching & Learning",
    question: "How do teachers interact with students?",
    answer: "Teachers provide interactive lessons, assignments, and feedback through our platform. They can track student progress, provide personalized guidance, and communicate with parents about their child's development."
  },
  {
    category: "Safety & Privacy",
    question: "How do you ensure student safety?",
    answer: "We prioritize student safety with secure login systems, monitored interactions, and strict privacy policies. All content is age-appropriate and our platform complies with COPPA regulations."
  }
]

export default function FAQPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', ...new Set(faqs.map(faq => faq.category))]
  const filteredFaqs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our educational platform
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="bg-white rounded-lg shadow-lg divide-y divide-gray-200">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="p-6">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                className="flex justify-between items-center w-full text-left"
              >
                <div className="flex items-start">
                  <QuestionMarkCircleIcon className="h-6 w-6 text-indigo-500 mr-3 mt-1" />
                  <div>
                    <span className="text-sm font-medium text-indigo-600 mb-1 block">
                      {faq.category}
                    </span>
                    <span className="text-lg font-medium text-gray-900">
                      {faq.question}
                    </span>
                  </div>
                </div>
                {openFaqIndex === index ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openFaqIndex === index && (
                <div className="mt-4 pl-9 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
} 