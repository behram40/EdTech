'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  MagnifyingGlassIcon,
  AcademicCapIcon,
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ExclamationTriangleIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'
import { students as sharedStudents } from '@/data/students'
import { useRouter } from 'next/navigation'
import { mockUserData, mockStudentData } from '../../data/mockData'

interface Student {
  id: number
  name: string
  grade: string
  enrolledCourses: {
    id: number
    title: string
    progress: number
    lastActive: string
    grade: string
    needsAttention?: boolean
    recommendations?: string[]
  }[]
  overallProgress: number
  averageGrade: number
  attendance: number
  status: 'active' | 'inactive'
  needsAttention?: boolean
  generalRecommendations?: string[]
}

// Use sharedStudents for the students list
const mockStudents = sharedStudents.map(s => ({
  ...s,
  // Provide defaults for any fields required by the UI but not present in shared data
  enrolledCourses: s.enrolledCourses || [],
  averageGrade: s.averageGrade || 0,
  attendance: s.attendance || 0,
  status: s.status || 'active',
  grade: s.grade || 'Grade 3',
  needsAttention: s.needsAttention || false,
  generalRecommendations: s.generalRecommendations || [],
}))

export default function TeacherStudentsPage() {
  const router = useRouter()
  const [students, setStudents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [expandedStudent, setExpandedStudent] = useState<number | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      if (userData.userType !== 'teacher') {
        router.push('/login')
        return
      }
      const teacherData = mockUserData[userData.email as keyof typeof mockUserData] as any
      if (teacherData && teacherData.studentEmails) {
        const assignedStudents = (teacherData.studentEmails as string[])
          .map(email => mockStudentData[email as keyof typeof mockStudentData])
          .filter(Boolean)
        setStudents(assignedStudents)
      }
    } else {
      router.push('/login')
    }
    setIsLoading(false)
  }, [router])

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGrade = selectedGrade === 'All' || student.grade === selectedGrade
    const matchesStatus = selectedStatus === 'All' || student.status === selectedStatus
    return matchesSearch && matchesGrade && matchesStatus
  })

  const grades = ['All', ...new Set(mockStudents.map(student => student.grade))]

  if (isLoading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">My Students</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {grades.map(grade => (
              <option key={grade} value={grade}>Grade: {grade}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="All">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
        {students.length === 0 ? (
          <p>No students assigned.</p>
        ) : (
          students.map((student) => (
            <motion.div
              key={student.email}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900">{student.name}</h3>
                      {student.needsAttention && (
                        <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 ml-2" />
                      )}
                    </div>
                    <button
                      onClick={() => setExpandedStudent(expandedStudent === student.id ? null : student.id)}
                      className="ml-4 text-gray-400 hover:text-gray-500"
                    >
                      {expandedStudent === student.id ? (
                        <ChevronUpIcon className="h-5 w-5" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">{student.grade}</p>

                  {/* Student Stats */}
                  <div className="mt-4 grid grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center">
                        <ChartBarIcon className="h-5 w-5 text-indigo-600 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Overall Progress</p>
                          <p className="text-lg font-semibold text-gray-900">{student.statistics.overallProgress}%</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center">
                        <AcademicCapIcon className="h-5 w-5 text-green-600 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Average Grade</p>
                          <p className="text-lg font-semibold text-gray-900">{student.statistics.averageGrade}%</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center">
                        <ClockIcon className="h-5 w-5 text-blue-600 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Attendance</p>
                          <p className="text-lg font-semibold text-gray-900">{student.statistics.attendance}%</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center">
                        <UserGroupIcon className="h-5 w-5 text-purple-600 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Courses</p>
                          <p className="text-lg font-semibold text-gray-900">{student.statistics.totalCourses}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Course Details */}
                  {expandedStudent === student.id && (
                    <div className="mt-6 space-y-6">
                      {/* Course Details */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-4">Enrolled Courses</h4>
                        <div className="space-y-4">
                          {student.enrolledCourses.map((course) => (
                            <div key={course.id} className={`bg-gray-50 rounded-lg p-4 ${course.needsAttention ? 'border-l-4 border-yellow-500' : ''}`}>
                              <div className="flex justify-between items-start">
                                <div>
                                  <h5 className="text-sm font-medium text-gray-900">{course.title}</h5>
                                  <p className="text-sm text-gray-500 mt-1">Grade: {course.grade}</p>
                                </div>
                                <span className="text-sm text-gray-500">Last active: {course.lastActive}</span>
                              </div>
                              <div className="mt-3">
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-500">Progress</span>
                                  <span className="text-gray-900">{course.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${
                                      course.progress >= 90 ? 'bg-green-600' :
                                      course.progress >= 70 ? 'bg-indigo-600' :
                                      course.progress >= 50 ? 'bg-yellow-600' :
                                      'bg-red-600'
                                    }`}
                                    style={{ width: `${course.progress}%` }}
                                  />
                                </div>
                              </div>
                              {course.recommendations && (
                                <div className="mt-4">
                                  <h6 className="text-sm font-medium text-gray-900 flex items-center">
                                    <LightBulbIcon className="h-4 w-4 text-yellow-500 mr-1" />
                                    Recommendations
                                  </h6>
                                  <ul className="mt-2 space-y-1">
                                    {course.recommendations.map((rec, index) => (
                                      <li key={index} className="text-sm text-gray-600 flex items-start">
                                        <span className="text-yellow-500 mr-2">•</span>
                                        {rec}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* General Recommendations */}
                      {student.generalRecommendations && (
                        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                          <h4 className="text-sm font-medium text-gray-900 flex items-center mb-3">
                            <LightBulbIcon className="h-5 w-5 text-yellow-500 mr-2" />
                            General Recommendations
                          </h4>
                          <ul className="space-y-2">
                            {student.generalRecommendations.map((rec, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start">
                                <span className="text-yellow-500 mr-2">•</span>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
} 