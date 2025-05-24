'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  UserCircleIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ClockIcon,
  ChartBarIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { mockStudentData, mockUserData } from '../data/mockData'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [studentData, setStudentData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [assignedStudents, setAssignedStudents] = useState<any[]>([])

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        const mockData = mockUserData[userData.email as keyof typeof mockUserData]
        setUser(mockData || userData)
        
        // Set student-specific data if user is a student
        if (mockData?.userType === 'student') {
          const studentSpecificData = mockStudentData[userData.email as keyof typeof mockStudentData]
          if (studentSpecificData) {
            // Merge the basic user data with student-specific data
            setStudentData({
              ...mockData,
              ...studentSpecificData,
              // Ensure we keep the student-specific data for courses, achievements, and AI reports
              enrolledCourses: studentSpecificData.enrolledCourses,
              achievements: studentSpecificData.achievements,
              aiReports: studentSpecificData.aiReports
            })
          }
        }
        // For teachers, get assigned students
        if (mockData?.userType === 'teacher' && (mockData as any).studentEmails) {
          const students = ((mockData as any).studentEmails as string[])
            .map((email: string) => mockStudentData[email as keyof typeof mockStudentData])
            .filter(Boolean)
          setAssignedStudents(students)
        }
      } catch (error) {
        console.error('Error parsing user data:', error)
        router.push('/login')
      }
    } else {
      router.push('/login')
    }
    setIsLoading(false)
  }, [router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  // Show error state if no user data
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No user data found. Please log in.</p>
          <button
            onClick={() => router.push('/login')}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded font-semibold hover:bg-indigo-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  // Use studentData for students instead of user data
  const displayData = user.userType === 'student' ? (studentData || user) : user

  // Ensure displayData exists before rendering
  if (!displayData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Error loading profile data.</p>
          <button
            onClick={() => router.push('/login')}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded font-semibold hover:bg-indigo-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white shadow-sm rounded-lg p-6 flex items-center space-x-6">
        <img
          src={'https://ui-avatars.com/api/?name=' + encodeURIComponent(displayData.name)}
          alt="Profile"
          className="w-24 h-24 rounded-full border"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900">{displayData.name}</h1>
          <p className="text-gray-500">{displayData.email}</p>
          <p className="text-sm text-gray-600 capitalize">{displayData.userType}</p>
          
          {displayData.userType === 'student' && (
            <div className="mt-2 text-sm text-gray-600">
              <p>School: {displayData.school || 'Not specified'}</p>
              <p>Grade: {displayData.grade || 'Not specified'}</p>
              <p>Member since: {displayData.joinDate || 'Not specified'}</p>
            </div>
          )}
          
          {displayData.userType === 'teacher' && (
            <div className="mt-2 text-sm text-gray-600">
              <p>Subjects: {displayData.subjects?.join(', ') || 'Not specified'}</p>
              <p>Grade Levels: {displayData.gradeLevels?.join(', ') || 'Not specified'}</p>
              <p>Experience: {displayData.experience || 'Not specified'}</p>
              <p>Specialization: {displayData.specialization || 'Not specified'}</p>
            </div>
          )}
          
          {(displayData.userType === 'school-admin' || displayData.userType === 'admin') && (
            <div className="mt-2 text-sm text-gray-600">
              <p>Role: {displayData.role || 'Not specified'}</p>
              <p>Department: {displayData.department || 'Not specified'}</p>
            </div>
          )}

          <button
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded font-semibold hover:bg-indigo-700"
            onClick={() => router.push('/profile/settings')}
          >
            Profile Settings
          </button>
        </div>
      </div>

      {/* Student Statistics */}
      {displayData.userType === 'student' && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard 
              icon={ChartBarIcon} 
              title="Overall Progress" 
              value={`${displayData.statistics?.overallProgress || 0}%`} 
            />
            <StatCard 
              icon={AcademicCapIcon} 
              title="Average Grade" 
              value={`${displayData.statistics?.averageGrade || 0}%`} 
            />
            <StatCard 
              icon={UsersIcon} 
              title="Attendance" 
              value={`${displayData.statistics?.attendance || 0}%`} 
            />
            <StatCard 
              icon={BookOpenIcon} 
              title="Courses" 
              value={displayData.statistics?.totalCourses || 0} 
            />
          </div>

          {/* Enrolled Courses */}
          {displayData.enrolledCourses && (
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Enrolled Courses</h2>
              <div className="space-y-4">
                {displayData.enrolledCourses.map((course: any) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">Last accessed: {course.lastAccessed}</p>
                        <div className="mt-2 space-y-1">
                          {course.assignments?.map((assignment: any, index: number) => (
                            <p key={index} className="text-xs text-gray-600">
                              {assignment.title}: {assignment.score}% ({assignment.date})
                            </p>
                          ))}
                        </div>
                      </div>
                      <span className="text-sm font-medium text-indigo-600">{course.progress}%</span>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* AI Reports */}
          {displayData.aiReports && (
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">AI Learning Report</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Learning Style</h3>
                  <p className="text-sm text-gray-600 mt-1">{displayData.aiReports.learningStyle}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Strengths</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                    {displayData.aiReports.strengths.map((strength: string, index: number) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Areas for Improvement</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                    {displayData.aiReports.areasForImprovement.map((area: string, index: number) => (
                      <li key={index}>{area}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Recommendations</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                    {displayData.aiReports.recommendations.map((rec: string, index: number) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Achievements */}
          {displayData.achievements && (
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Achievements</h2>
              <div className="space-y-4">
                {displayData.achievements.map((achievement: any) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-sm font-medium text-gray-900">{achievement.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{achievement.description}</p>
                    <p className="text-xs text-gray-400 mt-2">Achieved on {achievement.date}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Show assigned students for teachers */}
      {displayData.userType === 'teacher' && assignedStudents.length > 0 && (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">My Students</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assignedStudents.map(student => (
              <div key={student.email} className="border rounded-lg p-4 mb-2">
                <h3 className="font-semibold">{student.name}</h3>
                <p className="text-xs text-gray-500 mb-1">{student.email}</p>
                <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                  <span>Progress: {student.statistics.overallProgress}%</span>
                  <span>Avg Grade: {student.statistics.averageGrade}%</span>
                  <span>Attendance: {student.statistics.attendance}%</span>
                  <span>Courses: {student.statistics.totalCourses}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Show teaching stats for teachers */}
      {displayData.userType === 'teacher' && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard icon={UsersIcon} title="Total Students" value={assignedStudents.length} />
          <StatCard icon={BookOpenIcon} title="Active Courses" value={displayData.subjects?.length || 0} />
          <StatCard icon={ChartBarIcon} title="Average Rating" value={displayData.averageRating || '0/5'} />
        </div>
      )}
    </div>
  )
}

function StatCard({ icon: Icon, title, value }: { icon: any; title: string; value: string | number }) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-indigo-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
} 