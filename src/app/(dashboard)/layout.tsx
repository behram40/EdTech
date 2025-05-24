'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  HomeIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
  AcademicCapIcon,
  UsersIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'
import { mockUserData, mockStudentData } from './data/mockData'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      router.push('/login')
      return
    }
    const userData = JSON.parse(storedUser)
    // Prefer mockUserData for all users
    let mockData = mockUserData[userData.email as keyof typeof mockUserData] || userData
    // For students, merge with mockStudentData if available
    if (mockData.userType === 'student') {
      const studentSpecificData = mockStudentData[userData.email as keyof typeof mockStudentData]
      if (studentSpecificData) {
        mockData = { ...mockData, ...studentSpecificData }
      }
    }
    setUser(mockData)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  if (!user) {
    return null
  }

  let dashboardHref = '/dashboard'
  if (user.userType === 'teacher') {
    dashboardHref = '/teacher/dashboard'
  } else if (user.userType === 'school-admin') {
    dashboardHref = '/school-admin/dashboard'
  } else if (user.userType === 'admin') {
    dashboardHref = '/admin'
  }

  const navigation = [
    { name: 'Dashboard', href: dashboardHref, icon: HomeIcon },
    { name: 'Profile', href: '/profile', icon: UserCircleIcon },
  ]

  if (user.userType === 'student') {
    navigation.push(
      { name: 'Courses', href: '/courses', icon: BookOpenIcon }
    )
    navigation.push(
      { name: 'AI Reports', href: '/ai-reports', icon: ChartBarIcon }
    )
    navigation.push(
      { name: 'AI Chat', href: '/chat', icon: ChatBubbleLeftRightIcon }
    )
  }

  if (user.userType === 'teacher') {
    navigation[0] = { name: 'Dashboard', href: '/teacher/dashboard', icon: HomeIcon }
    navigation.push(
      { name: 'Courses', href: '/teacher/courses', icon: BookOpenIcon }
    )
    navigation.push(
      { name: 'AI Reports', href: '/ai-reports', icon: ChartBarIcon }
    )
    navigation.push(
      { name: 'Statistics', href: '/teacher/statistics', icon: ChartBarIcon }
    )
    navigation.push(
      { name: 'Students', href: '/teacher/students', icon: UsersIcon }
    )
  }

  if (user.userType === 'admin') {
    navigation[0] = { name: 'Dashboard', href: '/admin', icon: HomeIcon }
    navigation.push(
      { name: 'Teachers', href: '/admin/teachers', icon: AcademicCapIcon }
    )
    navigation.push(
      { name: 'Statistics', href: '/admin/statistics', icon: ChartBarIcon }
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <h1 className="text-xl font-bold text-indigo-600">EdTech Platform</h1>
            </div>
            <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-6 w-6 flex-shrink-0 ${
                        isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div>
                <p className="text-sm font-medium text-gray-700">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-auto flex items-center text-sm text-gray-500 hover:text-gray-700"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span className="ml-2">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
        <button
          type="button"
          className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 