'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  AcademicCapIcon,
  BookOpenIcon,
  ClockIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { accounts as initialAccounts } from '@/data/accounts';

// Simulate a logged-in user for demo
const loggedInEmail = 'aslan.demir@example.com';

// Mock data for student profile
const studentData = {
  enrolledCourses: [
    {
      id: 1,
      title: 'Fun with Numbers: Basic Math for Kids',
      progress: 75,
      lastAccessed: '2 hours ago',
    },
    {
      id: 2,
      title: 'Science Adventures: Exploring Our World',
      progress: 45,
      lastAccessed: '1 day ago',
    },
    {
      id: 3,
      title: 'Creative Writing for Young Authors',
      progress: 30,
      lastAccessed: '3 days ago',
    },
  ],
  achievements: [
    {
      id: 1,
      title: 'Math Whiz',
      description: 'Completed 5 math lessons with perfect scores',
      date: '2024-02-15',
    },
    {
      id: 2,
      title: 'Science Explorer',
      description: 'Completed all science experiments successfully',
      date: '2024-01-30',
    },
  ],
  statistics: {
    totalCourses: 3,
    completedCourses: 1,
    averageScore: 92,
    totalStudyHours: 25,
  },
};

export default function ProfilePage() {
  const router = useRouter();
  const [accounts] = useState(initialAccounts);
  const user = accounts.find(acc => acc.email === loggedInEmail);

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Profile</h2>
        <p className="text-red-600">User not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white shadow-sm rounded-lg p-6 flex items-center space-x-6">
        <img
          src={'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name)}
          alt="Profile"
          className="w-24 h-24 rounded-full border"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
          <button
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded font-semibold hover:bg-indigo-700"
            onClick={() => router.push('/dashboard/profile/settings')}
          >
            Profile Settings
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={BookOpenIcon} title="Total Courses" value={studentData.statistics.totalCourses} />
        <StatCard icon={AcademicCapIcon} title="Completed Courses" value={studentData.statistics.completedCourses} />
        <StatCard icon={ChartBarIcon} title="Average Score" value={`${studentData.statistics.averageScore}%`} />
        <StatCard icon={ClockIcon} title="Study Hours" value={studentData.statistics.totalStudyHours} />
      </div>

      {/* Enrolled Courses Section */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Enrolled Courses</h2>
        <div className="space-y-4">
          {studentData.enrolledCourses.map((course) => (
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

      {/* Achievements Section */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Achievements</h2>
        <div className="space-y-4">
          {studentData.achievements.map((achievement) => (
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
    </div>
  );
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
  );
} 