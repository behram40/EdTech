'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ChartBarIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface Course {
  id: number
  title: string
  gradeLevel: 'Elementary' | 'Middle School' | 'High School'
  subject: string
  description: string
  students: number
  rating: number
  status: 'active' | 'draft' | 'archived'
  lastUpdated: string
  progress: number
  ageGroup: string
  prerequisites: string[]
  learningObjectives: string[]
}

// Mock data for teacher's courses
const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Fun with Basic Mathematics',
    gradeLevel: 'Elementary',
    subject: 'Mathematics',
    description: 'An engaging introduction to basic arithmetic, shapes, and patterns for young learners.',
    students: 156,
    rating: 4.8,
    status: 'active',
    lastUpdated: '2024-02-15',
    progress: 100,
    ageGroup: 'Ages 6-8',
    prerequisites: ['Basic counting skills'],
    learningObjectives: [
      'Master addition and subtraction up to 100',
      'Recognize basic geometric shapes',
      'Understand simple patterns and sequences'
    ]
  },
  {
    id: 2,
    title: 'Introduction to Science for Kids',
    gradeLevel: 'Elementary',
    subject: 'Science',
    description: 'Explore the wonders of science through fun experiments and interactive activities.',
    students: 89,
    rating: 4.9,
    status: 'active',
    lastUpdated: '2024-02-10',
    progress: 85,
    ageGroup: 'Ages 7-9',
    prerequisites: ['Basic reading skills'],
    learningObjectives: [
      'Understand basic scientific concepts',
      'Learn to make simple observations',
      'Develop curiosity about the natural world'
    ]
  },
  {
    id: 3,
    title: 'Creative Writing Workshop',
    gradeLevel: 'Middle School',
    subject: 'Language Arts',
    description: 'Develop writing skills through creative storytelling and expressive writing exercises.',
    students: 120,
    rating: 4.7,
    status: 'draft',
    lastUpdated: '2024-02-05',
    progress: 60,
    ageGroup: 'Ages 11-13',
    prerequisites: ['Basic writing skills'],
    learningObjectives: [
      'Create engaging stories',
      'Develop vocabulary and grammar skills',
      'Express ideas clearly in writing'
    ]
  }
]

export default function TeacherCoursesPage() {
  const [showAddCourseModal, setShowAddCourseModal] = useState(false)
  const [showEditCourseModal, setShowEditCourseModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [courses, setCourses] = useState<Course[]>(mockCourses)
  const [newCourse, setNewCourse] = useState({
    title: '',
    gradeLevel: 'Elementary' as Course['gradeLevel'],
    subject: 'Mathematics',
    description: '',
    ageGroup: '',
    prerequisites: [''],
    learningObjectives: ['']
  })

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault()
    const course: Course = {
      id: courses.length + 1,
      title: newCourse.title,
      gradeLevel: newCourse.gradeLevel,
      subject: newCourse.subject,
      description: newCourse.description,
      students: 0,
      rating: 0,
      status: 'draft',
      lastUpdated: new Date().toISOString().split('T')[0],
      progress: 0,
      ageGroup: newCourse.ageGroup,
      prerequisites: newCourse.prerequisites,
      learningObjectives: newCourse.learningObjectives
    }
    setCourses([...courses, course])
    setShowAddCourseModal(false)
    setNewCourse({
      title: '',
      gradeLevel: 'Elementary' as Course['gradeLevel'],
      subject: 'Mathematics',
      description: '',
      ageGroup: '',
      prerequisites: [''],
      learningObjectives: ['']
    })
  }

  const handleEditCourse = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCourse) return

    const updatedCourses = courses.map((course: Course) => 
      course.id === selectedCourse.id 
        ? { ...course, ...selectedCourse, lastUpdated: new Date().toISOString().split('T')[0] }
        : course
    )
    setCourses(updatedCourses)
    setShowEditCourseModal(false)
    setSelectedCourse(null)
  }

  const handleDeleteCourse = (courseId: number) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter((course: Course) => course.id !== courseId))
    }
  }

  const handleStatusChange = (courseId: number, newStatus: Course['status']) => {
    const updatedCourses = courses.map((course: Course) =>
      course.id === courseId
        ? { ...course, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] }
        : course
    )
    setCourses(updatedCourses)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">My K-12 Courses</h1>
        <button
          onClick={() => setShowAddCourseModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Course
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow-sm rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{course.gradeLevel} • {course.subject}</p>
                  <p className="mt-1 text-sm text-indigo-600">{course.ageGroup}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    course.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : course.status === 'draft'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">{course.description}</p>
              
              {/* Learning Objectives */}
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">Learning Objectives:</h4>
                <ul className="mt-2 space-y-1">
                  {course.learningObjectives.map((objective, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="text-indigo-600 mr-2">•</span>
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prerequisites */}
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">Prerequisites:</h4>
                <ul className="mt-2 space-y-1">
                  {course.prerequisites.map((prereq, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="text-indigo-600 mr-2">•</span>
                      {prereq}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Students</span>
                  <span className="text-gray-900">{course.students}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Rating</span>
                  <span className="text-gray-900">{course.rating.toFixed(1)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Last Updated</span>
                  <span className="text-gray-900">{course.lastUpdated}</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Progress</span>
                  <span className="text-gray-900">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-between space-x-3">
                <button
                  onClick={() => {
                    setSelectedCourse(course)
                    setShowEditCourseModal(true)
                  }}
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Delete
                </button>
              </div>
              <div className="mt-3">
                <select
                  value={course.status}
                  onChange={(e) => handleStatusChange(course.id, e.target.value as Course['status'])}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="active">Set as Active</option>
                  <option value="draft">Set as Draft</option>
                  <option value="archived">Archive Course</option>
                </select>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Course Modal */}
      {showAddCourseModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Create New Course</h3>
              <button
                onClick={() => setShowAddCourseModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleAddCourse} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Title</label>
                <input
                  type="text"
                  required
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Grade Level</label>
                <select
                  required
                  value={newCourse.gradeLevel}
                  onChange={(e) => setNewCourse({ ...newCourse, gradeLevel: e.target.value as Course['gradeLevel'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="Elementary">Elementary School</option>
                  <option value="Middle School">Middle School</option>
                  <option value="High School">High School</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <select
                  required
                  value={newCourse.subject}
                  onChange={(e) => setNewCourse({ ...newCourse, subject: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="Language Arts">Language Arts</option>
                  <option value="Social Studies">Social Studies</option>
                  <option value="Art">Art</option>
                  <option value="Music">Music</option>
                  <option value="Physical Education">Physical Education</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age Group</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Ages 6-8"
                  value={newCourse.ageGroup}
                  onChange={(e) => setNewCourse({ ...newCourse, ageGroup: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  required
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Learning Objectives</label>
                {newCourse.learningObjectives.map((objective, index) => (
                  <div key={index} className="mt-2">
                    <input
                      type="text"
                      required
                      value={objective}
                      onChange={(e) => {
                        const newObjectives = [...newCourse.learningObjectives]
                        newObjectives[index] = e.target.value
                        setNewCourse({ ...newCourse, learningObjectives: newObjectives })
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setNewCourse({ ...newCourse, learningObjectives: [...newCourse.learningObjectives, ''] })}
                  className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
                >
                  + Add Objective
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Prerequisites</label>
                {newCourse.prerequisites.map((prereq, index) => (
                  <div key={index} className="mt-2">
                    <input
                      type="text"
                      required
                      value={prereq}
                      onChange={(e) => {
                        const newPrereqs = [...newCourse.prerequisites]
                        newPrereqs[index] = e.target.value
                        setNewCourse({ ...newCourse, prerequisites: newPrereqs })
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setNewCourse({ ...newCourse, prerequisites: [...newCourse.prerequisites, ''] })}
                  className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
                >
                  + Add Prerequisite
                </button>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddCourseModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Course Modal */}
      {showEditCourseModal && selectedCourse && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Edit Course</h3>
              <button
                onClick={() => {
                  setShowEditCourseModal(false)
                  setSelectedCourse(null)
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleEditCourse} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Title</label>
                <input
                  type="text"
                  required
                  value={selectedCourse.title}
                  onChange={(e) => setSelectedCourse({ ...selectedCourse, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Grade Level</label>
                <select
                  required
                  value={selectedCourse.gradeLevel}
                  onChange={(e) => setSelectedCourse({ ...selectedCourse, gradeLevel: e.target.value as Course['gradeLevel'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="Elementary">Elementary School</option>
                  <option value="Middle School">Middle School</option>
                  <option value="High School">High School</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <select
                  required
                  value={selectedCourse.subject}
                  onChange={(e) => setSelectedCourse({ ...selectedCourse, subject: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="Language Arts">Language Arts</option>
                  <option value="Social Studies">Social Studies</option>
                  <option value="Art">Art</option>
                  <option value="Music">Music</option>
                  <option value="Physical Education">Physical Education</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age Group</label>
                <input
                  type="text"
                  required
                  value={selectedCourse.ageGroup}
                  onChange={(e) => setSelectedCourse({ ...selectedCourse, ageGroup: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  required
                  value={selectedCourse.description}
                  onChange={(e) => setSelectedCourse({ ...selectedCourse, description: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  required
                  value={selectedCourse.status}
                  onChange={(e) => setSelectedCourse({ ...selectedCourse, status: e.target.value as Course['status'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditCourseModal(false)
                    setSelectedCourse(null)
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 