'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ServerIcon,
  ClockIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  CpuChipIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  BoltIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

// Mock data for system performance metrics
const systemMetrics = {
  responseTime: {
    current: 245, // ms
    target: 300,
    trend: 'decreasing',
    history: [320, 290, 275, 245]
  },
  loadTime: {
    current: 1.8, // seconds
    target: 3,
    trend: 'stable',
    history: [2.1, 1.9, 1.8, 1.8]
  },
  loginVerification: {
    current: 1.2, // seconds
    target: 4,
    trend: 'stable',
    history: [1.3, 1.2, 1.2, 1.2]
  },
  queryResponse: {
    current: 2.8, // seconds
    target: 5,
    trend: 'decreasing',
    history: [3.5, 3.2, 3.0, 2.8]
  }
}

// Mock data for system reliability metrics
const reliabilityMetrics = {
  concurrentUsers: {
    current: 1250,
    max: 5000,
    trend: 'increasing',
    history: [800, 950, 1100, 1250]
  },
  errorRate: {
    current: 0.05, // percentage
    target: 0.1,
    trend: 'decreasing',
    history: [0.12, 0.09, 0.07, 0.05]
  },
  dataAccuracy: {
    current: 99.98, // percentage
    target: 99.9,
    trend: 'stable',
    history: [99.95, 99.96, 99.97, 99.98]
  },
  systemUptime: {
    current: 99.99, // percentage
    target: 99.9,
    trend: 'stable',
    history: [99.97, 99.98, 99.99, 99.99]
  }
}

// Mock data for AI performance metrics
const aiMetrics = {
  responseAccuracy: {
    current: 98.5, // percentage
    target: 95,
    trend: 'increasing',
    history: [96.0, 97.2, 98.0, 98.5]
  },
  hallucinationRate: {
    current: 0.8, // percentage
    target: 2,
    trend: 'decreasing',
    history: [2.5, 1.8, 1.2, 0.8]
  },
  parameterCompliance: {
    current: 99.9, // percentage
    target: 99,
    trend: 'stable',
    history: [99.5, 99.7, 99.8, 99.9]
  },
  averageResponseTime: {
    current: 1.5, // seconds
    target: 3,
    trend: 'decreasing',
    history: [2.2, 1.9, 1.7, 1.5]
  }
}

// Mock data for recent system events
const recentEvents = [
  {
    id: 1,
    type: 'performance',
    message: 'System load time improved by 15%',
    timestamp: '2024-03-15 14:30:00',
    status: 'success'
  },
  {
    id: 2,
    type: 'reliability',
    message: 'Database query optimization completed',
    timestamp: '2024-03-15 13:45:00',
    status: 'success'
  },
  {
    id: 3,
    type: 'ai',
    message: 'AI model updated with improved accuracy',
    timestamp: '2024-03-15 12:15:00',
    status: 'success'
  },
  {
    id: 4,
    type: 'error',
    message: 'Temporary spike in response time detected',
    timestamp: '2024-03-15 11:20:00',
    status: 'warning'
  }
]

export default function AdminStatisticsPage() {
  const [timeRange, setTimeRange] = useState('24h')

  const getStatusColor = (current: number, target: number) => {
    if (current <= target * 0.8) return 'text-green-600'
    if (current <= target) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <ArrowTrendingUpIcon className="h-5 w-5 text-green-500" />
      case 'decreasing':
        return <ArrowTrendingUpIcon className="h-5 w-5 text-red-500 transform rotate-180" />
      default:
        return <ChartBarIcon className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">System Statistics</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BoltIcon className="h-6 w-6 text-indigo-600" />
              <h3 className="ml-2 text-sm font-medium text-gray-900">Response Time</h3>
            </div>
            {getTrendIcon(systemMetrics.responseTime.trend)}
          </div>
          <div className="mt-4">
            <p className={`text-2xl font-semibold ${getStatusColor(systemMetrics.responseTime.current, systemMetrics.responseTime.target)}`}>
              {systemMetrics.responseTime.current}ms
            </p>
            <p className="text-sm text-gray-500">Target: {systemMetrics.responseTime.target}ms</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ClockIcon className="h-6 w-6 text-indigo-600" />
              <h3 className="ml-2 text-sm font-medium text-gray-900">Load Time</h3>
            </div>
            {getTrendIcon(systemMetrics.loadTime.trend)}
          </div>
          <div className="mt-4">
            <p className={`text-2xl font-semibold ${getStatusColor(systemMetrics.loadTime.current, systemMetrics.loadTime.target)}`}>
              {systemMetrics.loadTime.current}s
            </p>
            <p className="text-sm text-gray-500">Target: {systemMetrics.loadTime.target}s</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ShieldCheckIcon className="h-6 w-6 text-indigo-600" />
              <h3 className="ml-2 text-sm font-medium text-gray-900">Login Verification</h3>
            </div>
            {getTrendIcon(systemMetrics.loginVerification.trend)}
          </div>
          <div className="mt-4">
            <p className={`text-2xl font-semibold ${getStatusColor(systemMetrics.loginVerification.current, systemMetrics.loginVerification.target)}`}>
              {systemMetrics.loginVerification.current}s
            </p>
            <p className="text-sm text-gray-500">Target: {systemMetrics.loginVerification.target}s</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ServerIcon className="h-6 w-6 text-indigo-600" />
              <h3 className="ml-2 text-sm font-medium text-gray-900">Query Response</h3>
            </div>
            {getTrendIcon(systemMetrics.queryResponse.trend)}
          </div>
          <div className="mt-4">
            <p className={`text-2xl font-semibold ${getStatusColor(systemMetrics.queryResponse.current, systemMetrics.queryResponse.target)}`}>
              {systemMetrics.queryResponse.current}s
            </p>
            <p className="text-sm text-gray-500">Target: {systemMetrics.queryResponse.target}s</p>
          </div>
        </motion.div>
      </div>

      {/* Reliability Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <UserGroupIcon className="h-6 w-6 text-indigo-600" />
              <h3 className="ml-2 text-sm font-medium text-gray-900">Concurrent Users</h3>
            </div>
            {getTrendIcon(reliabilityMetrics.concurrentUsers.trend)}
          </div>
          <div className="mt-4">
            <p className="text-2xl font-semibold text-gray-900">
              {reliabilityMetrics.concurrentUsers.current.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">Max Capacity: {reliabilityMetrics.concurrentUsers.max.toLocaleString()}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-6 w-6 text-indigo-600" />
              <h3 className="ml-2 text-sm font-medium text-gray-900">Error Rate</h3>
            </div>
            {getTrendIcon(reliabilityMetrics.errorRate.trend)}
          </div>
          <div className="mt-4">
            <p className={`text-2xl font-semibold ${getStatusColor(reliabilityMetrics.errorRate.target, reliabilityMetrics.errorRate.current)}`}>
              {reliabilityMetrics.errorRate.current}%
            </p>
            <p className="text-sm text-gray-500">Target: {reliabilityMetrics.errorRate.target}%</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircleIcon className="h-6 w-6 text-indigo-600" />
              <h3 className="ml-2 text-sm font-medium text-gray-900">Data Accuracy</h3>
            </div>
            {getTrendIcon(reliabilityMetrics.dataAccuracy.trend)}
          </div>
          <div className="mt-4">
            <p className={`text-2xl font-semibold ${getStatusColor(reliabilityMetrics.dataAccuracy.target, reliabilityMetrics.dataAccuracy.current)}`}>
              {reliabilityMetrics.dataAccuracy.current}%
            </p>
            <p className="text-sm text-gray-500">Target: {reliabilityMetrics.dataAccuracy.target}%</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ServerIcon className="h-6 w-6 text-indigo-600" />
              <h3 className="ml-2 text-sm font-medium text-gray-900">System Uptime</h3>
            </div>
            {getTrendIcon(reliabilityMetrics.systemUptime.trend)}
          </div>
          <div className="mt-4">
            <p className={`text-2xl font-semibold ${getStatusColor(reliabilityMetrics.systemUptime.target, reliabilityMetrics.systemUptime.current)}`}>
              {reliabilityMetrics.systemUptime.current}%
            </p>
            <p className="text-sm text-gray-500">Target: {reliabilityMetrics.systemUptime.target}%</p>
          </div>
        </motion.div>
      </div>

      {/* AI Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CpuChipIcon className="h-6 w-6 text-indigo-600" />
              <h3 className="ml-2 text-sm font-medium text-gray-900">AI Response Accuracy</h3>
            </div>
            {getTrendIcon(aiMetrics.responseAccuracy.trend)}
          </div>
          <div className="mt-4">
            <p className={`text-2xl font-semibold ${getStatusColor(aiMetrics.responseAccuracy.target, aiMetrics.responseAccuracy.current)}`}>
              {aiMetrics.responseAccuracy.current}%
            </p>
            <p className="text-sm text-gray-500">Target: {aiMetrics.responseAccuracy.target}%</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-6 w-6 text-indigo-600" />
              <h3 className="ml-2 text-sm font-medium text-gray-900">Hallucination Rate</h3>
            </div>
            {getTrendIcon(aiMetrics.hallucinationRate.trend)}
          </div>
          <div className="mt-4">
            <p className={`text-2xl font-semibold ${getStatusColor(aiMetrics.hallucinationRate.current, aiMetrics.hallucinationRate.target)}`}>
              {aiMetrics.hallucinationRate.current}%
            </p>
            <p className="text-sm text-gray-500">Target: {aiMetrics.hallucinationRate.target}%</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ShieldCheckIcon className="h-6 w-6 text-indigo-600" />
              <h3 className="ml-2 text-sm font-medium text-gray-900">Parameter Compliance</h3>
            </div>
            {getTrendIcon(aiMetrics.parameterCompliance.trend)}
          </div>
          <div className="mt-4">
            <p className={`text-2xl font-semibold ${getStatusColor(aiMetrics.parameterCompliance.target, aiMetrics.parameterCompliance.current)}`}>
              {aiMetrics.parameterCompliance.current}%
            </p>
            <p className="text-sm text-gray-500">Target: {aiMetrics.parameterCompliance.target}%</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BoltIcon className="h-6 w-6 text-indigo-600" />
              <h3 className="ml-2 text-sm font-medium text-gray-900">AI Response Time</h3>
            </div>
            {getTrendIcon(aiMetrics.averageResponseTime.trend)}
          </div>
          <div className="mt-4">
            <p className={`text-2xl font-semibold ${getStatusColor(aiMetrics.averageResponseTime.current, aiMetrics.averageResponseTime.target)}`}>
              {aiMetrics.averageResponseTime.current}s
            </p>
            <p className="text-sm text-gray-500">Target: {aiMetrics.averageResponseTime.target}s</p>
          </div>
        </motion.div>
      </div>

      {/* Recent System Events */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent System Events</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentEvents.map((event) => (
            <div key={event.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`h-2 w-2 rounded-full ${
                    event.status === 'success' ? 'bg-green-400' : 'bg-yellow-400'
                  }`} />
                  <p className="ml-3 text-sm font-medium text-gray-900">{event.message}</p>
                </div>
                <p className="text-sm text-gray-500">{event.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 