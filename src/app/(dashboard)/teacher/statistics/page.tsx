'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ChartBarIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  StarIcon
} from '@heroicons/react/24/outline'

// Mock data for teacher statistics
const mockStats = {
  totalStudents: 1234,
  activeCourses: 5,
  averageRating: 4.8,
  completionRate: 87,
  averageEngagement: 92,
  totalHoursTaught: 256
}

// Mock data for course performance
const coursePerformance = [
  {
    id: 1,
    title: 'Introduction to Machine Learning',
    students: 450,
    completionRate: 92,
    averageScore: 88,
    engagement: 95
  },
  {
    id: 2,
    title: 'Advanced Mathematics',
    students: 320,
    completionRate: 85,
    averageScore: 82,
    engagement: 88
  },
  {
    id: 3,
    title: 'Data Structures and Algorithms',
    students: 280,
    completionRate: 78,
    averageScore: 85,
    engagement: 90
  }
]

// Mock data for student engagement over time
const engagementData = [
  { month: 'Jan', engagement: 85 },
  { month: 'Feb', engagement: 88 },
  { month: 'Mar', engagement: 92 },
  { month: 'Apr', engagement: 90 },
  { month: 'May', engagement: 95 },
  { month: 'Jun', engagement: 93 }
]

export default function TeacherStatisticsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('6m')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Teaching Statistics</h1>
        <select
          value={selectedTimeRange}
          onChange={(e) => setSelectedTimeRange(e.target.value)}
          className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="1m">Last Month</option>
          <option value="3m">Last 3 Months</option>
          <option value="6m">Last 6 Months</option>
          <option value="1y">Last Year</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-semibold text-gray-900">{mockStats.totalStudents}</p>
            </div>
            <UserGroupIcon className="h-8 w-8 text-indigo-600" />
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
              <span>+12% from last month</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-2xl font-semibold text-gray-900">{mockStats.averageRating}</p>
            </div>
            <StarIcon className="h-8 w-8 text-yellow-400" />
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
              <span>+0.2 from last month</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{mockStats.completionRate}%</p>
            </div>
            <AcademicCapIcon className="h-8 w-8 text-green-600" />
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
              <span>+5% from last month</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Course Performance Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Course Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completion Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engagement
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {coursePerformance.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{course.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{course.students}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{course.completionRate}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{course.averageScore}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{course.engagement}%</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Engagement Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Student Engagement Over Time</h2>
        <div className="h-64 flex items-end space-x-2">
          {engagementData.map((data, index) => (
            <motion.div
              key={data.month}
              initial={{ height: 0 }}
              animate={{ height: `${data.engagement}%` }}
              transition={{ delay: index * 0.1 }}
              className="flex-1 bg-indigo-600 rounded-t"
              style={{ height: `${data.engagement}%` }}
            >
              <div className="text-center -mt-6 text-sm text-gray-600">{data.month}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 