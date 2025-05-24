'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EnvelopeIcon,
  PhoneIcon,
  AcademicCapIcon,
  UserPlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { mockUserData } from '../../data/mockData'

interface User {
  name: string
  email: string
  userType: 'student' | 'teacher' | 'admin'
}

interface Teacher {
  id: number
  name: string
  email: string
  phone: string
  department: string
  coursesTaught: number
  students: number
  rating: number
  status: 'active' | 'inactive'
  joinDate: string
}

export default function AdminTeachersPage() {
  const [user, setUser] = useState<User | null>(null)
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false)
  const [showEditTeacherModal, setShowEditTeacherModal] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [teachers, setTeachers] = useState<any[]>([])
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Computer Science'
  })
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in and is an admin
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      router.push('/login')
      return
    }

    const parsedUser = JSON.parse(storedUser)
    if (parsedUser.userType !== 'admin') {
      router.push('/dashboard')
      return
    }

    setUser(parsedUser)
    // In a real application, this would be an API call
    setTeachers(Object.values(mockUserData).filter((u: any) => u.userType === 'teacher'))
  }, [router])

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newTeacher.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    // Validate phone format
    const phoneRegex = /^\+?[\d\s-()]+$/
    if (!phoneRegex.test(newTeacher.phone)) {
      toast.error('Please enter a valid phone number')
      return
    }

    const teacher: Teacher = {
      id: teachers.length + 1,
      name: newTeacher.name,
      email: newTeacher.email,
      phone: newTeacher.phone,
      department: newTeacher.department,
      coursesTaught: 0,
      students: 0,
      rating: 0,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0]
    }

    // In a real application, this would be an API call
    setTeachers([...teachers, teacher])
    setShowAddTeacherModal(false)
    setNewTeacher({
      name: '',
      email: '',
      phone: '',
      department: 'Computer Science'
    })
    toast.success('Teacher added successfully')
  }

  const handleEditTeacher = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTeacher) return

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(selectedTeacher.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    // Validate phone format
    const phoneRegex = /^\+?[\d\s-()]+$/
    if (!phoneRegex.test(selectedTeacher.phone)) {
      toast.error('Please enter a valid phone number')
      return
    }

    // In a real application, this would be an API call
    const updatedTeachers = teachers.map((teacher: Teacher) => 
      teacher.id === selectedTeacher.id 
        ? { ...teacher, ...selectedTeacher }
        : teacher
    )
    setTeachers(updatedTeachers)
    setShowEditTeacherModal(false)
    setSelectedTeacher(null)
    toast.success('Teacher updated successfully')
  }

  const handleDeleteTeacher = (teacherId: number) => {
    if (window.confirm('Are you sure you want to delete this teacher? This action cannot be undone.')) {
      // In a real application, this would be an API call
      setTeachers(teachers.filter((teacher: Teacher) => teacher.id !== teacherId))
      toast.success('Teacher deleted successfully')
    }
  }

  const filteredTeachers = teachers.filter((teacher: Teacher) => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = selectedDepartment === 'all' || teacher.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  if (!user) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Teachers</h1>
      <div className="bg-white rounded-lg shadow p-6">
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
    </div>
  )
} 