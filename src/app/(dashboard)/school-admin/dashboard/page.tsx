'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { mockUserData, mockStudentData } from '../../data/mockData'

export default function SchoolAdminDashboard() {
  const router = useRouter()
  const [teachers, setTeachers] = useState<any[]>([])
  const [students, setStudents] = useState<any[]>([])
  const [studentStats, setStudentStats] = useState({
    avgProgress: 0,
    avgGrade: 0,
    avgAttendance: 0,
    total: 0
  })
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      if (userData.userType !== 'school-admin') {
        router.push('/login')
      } else {
        setUser(userData)
      }
    } else {
      router.push('/login')
    }
  }, [router])

  useEffect(() => {
    // Get all teachers
    const allTeachers = Object.values(mockUserData).filter((u: any) => u.userType === 'teacher')
    setTeachers(allTeachers)
    // Get all students
    const allStudents = Object.values(mockStudentData)
    setStudents(allStudents)
    // Aggregate stats
    if (allStudents.length > 0) {
      const avgProgress = Math.round(allStudents.reduce((sum, s: any) => sum + (s.statistics.overallProgress || 0), 0) / allStudents.length)
      const avgGrade = Math.round(allStudents.reduce((sum, s: any) => sum + (s.statistics.averageGrade || 0), 0) / allStudents.length)
      const avgAttendance = Math.round(allStudents.reduce((sum, s: any) => sum + (s.statistics.attendance || 0), 0) / allStudents.length)
      setStudentStats({
        avgProgress,
        avgGrade,
        avgAttendance,
        total: allStudents.length
      })
    }
  }, [])

  const handleDeleteTeacher = (teacherId: number) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(teachers.filter(teacher => teacher.id !== teacherId))
      // In a real app, this would be an API call
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">School Admin Dashboard</h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-900 mr-4">Welcome, {user.name}</span>
              <button
                onClick={() => {
                  localStorage.removeItem('user')
                  router.push('/login')
                }}
                className="text-sm text-red-700 hover:text-red-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="max-w-7xl mx-auto p-8 space-y-8">
            <h1 className="text-2xl font-bold mb-6">School Admin Dashboard</h1>
            {/* Aggregate Student Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-sm text-gray-700 mb-1">Total Students</div>
                <div className="text-2xl font-bold text-gray-900">{studentStats.total}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-sm text-gray-700 mb-1">Avg Progress</div>
                <div className="text-2xl font-bold text-gray-900">{studentStats.avgProgress}%</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-sm text-gray-700 mb-1">Avg Grade</div>
                <div className="text-2xl font-bold text-gray-900">{studentStats.avgGrade}%</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-sm text-gray-700 mb-1">Avg Attendance</div>
                <div className="text-2xl font-bold text-gray-900">{studentStats.avgAttendance}%</div>
              </div>
            </div>
            {/* Teachers Table */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">Teachers</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Subjects</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Avg Rating</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase"># Students</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teachers.map((t: any) => (
                      <tr key={t.email}>
                        <td className="px-4 py-2 whitespace-nowrap text-gray-900">{t.name}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-gray-900">{t.email}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-gray-800">{t.subjects?.join(', ')}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-gray-900">{t.averageRating ? t.averageRating.toFixed(1) : '-'}/5</td>
                        <td className="px-4 py-2 whitespace-nowrap text-gray-900">{t.studentEmails ? t.studentEmails.length : 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Students Table */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">All Students</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Grade</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Progress</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Avg Grade</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Attendance</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((s: any) => (
                      <tr key={s.email}>
                        <td className="px-4 py-2 whitespace-nowrap text-gray-900">{s.name}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-gray-900">{s.email}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-gray-800">{s.grade}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-gray-900">{s.statistics.overallProgress}%</td>
                        <td className="px-4 py-2 whitespace-nowrap text-gray-900">{s.statistics.averageGrade}%</td>
                        <td className="px-4 py-2 whitespace-nowrap text-gray-900">{s.statistics.attendance}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 