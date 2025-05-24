'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { StarIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

// Mock data for available courses
const availableCourses = [
  {
    id: 1,
    title: 'Fun with Numbers: Basic Math for Kids',
    description: 'Learn addition, subtraction, and basic math concepts through fun games and activities.',
    category: 'Mathematics',
    instructor: 'Emily Johnson',
    rating: 4.9,
    students: 245,
    duration: '8 weeks',
    level: 'Elementary',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 2,
    title: 'Science Adventures: Exploring Our World',
    description: 'Discover the wonders of science through exciting experiments and hands-on activities.',
    category: 'Science',
    instructor: 'Michael Rodriguez',
    rating: 4.8,
    students: 180,
    duration: '10 weeks',
    level: 'Elementary',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 3,
    title: 'Creative Writing for Young Authors',
    description: 'Develop writing skills through storytelling, poetry, and creative expression.',
    category: 'Language Arts',
    instructor: 'Sarah Williams',
    rating: 4.7,
    students: 156,
    duration: '12 weeks',
    level: 'Middle School',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 4,
    title: 'World History Explorers',
    description: 'Journey through time to learn about ancient civilizations and important historical events.',
    category: 'Social Studies',
    instructor: 'Lisa Thompson',
    rating: 4.8,
    students: 132,
    duration: '10 weeks',
    level: 'Middle School',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 5,
    title: 'Art & Music Discovery',
    description: 'Explore different art forms and musical instruments in this creative journey.',
    category: 'Arts & Music',
    instructor: 'Maria Garcia',
    rating: 4.9,
    students: 168,
    duration: '8 weeks',
    level: 'Elementary',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 6,
    title: 'Fun Fitness & Sports',
    description: 'Learn about different sports and stay active with fun physical activities.',
    category: 'Physical Education',
    instructor: 'James Wilson',
    rating: 4.7,
    students: 195,
    duration: '6 weeks',
    level: 'Elementary',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  }
]

const categories = ['All', 'Mathematics', 'Science', 'Language Arts', 'Social Studies', 'Arts & Music', 'Physical Education']
const levels = ['All', 'Elementary', 'Middle School', 'High School']

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCourses = availableCourses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesLevel && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Available Courses</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {levels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-1 rounded text-sm">
                {course.category}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{course.description}</p>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <StarIconSolid className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-900">{course.rating}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <UserGroupIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-500">{course.students} students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-500">{course.duration}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium text-indigo-600">{course.level}</span>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Enroll Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 