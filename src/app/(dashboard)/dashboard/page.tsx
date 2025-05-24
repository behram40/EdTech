'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import StudentDashboard from './StudentDashboard'

export default function SmartDashboard() {
  const router = useRouter()
  const [role, setRole] = useState<string | null>(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      router.replace('/login')
      return
    }
    const user = JSON.parse(storedUser)
    const userRole = user.role || user.userType
    setRole(userRole)
    setChecked(true)
    if (userRole === 'teacher') {
      router.replace('/teacher/dashboard')
    } else if (userRole === 'admin') {
      router.replace('/admin')
    } else if (userRole === 'school-admin') {
      router.replace('/school-admin/dashboard')
    }
    // If student, stay and render dashboard
  }, [router])

  if (!checked) {
  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Redirecting to your dashboard...</p>
        </div>
    </div>
  )
  }

  if (role === 'student') {
    return <StudentDashboard />
  }

  return null
} 