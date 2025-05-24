'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import toast from 'react-hot-toast'

// Mock teacher data - in a real app, this would come from an API
const mockTeachers = [
  { id: 1, name: 'Jane Teacher', email: 'jane@school.com', subjects: ['Math', 'Physics'], students: 45, rating: 4.8 },
  { id: 2, name: 'John Smith', email: 'john@school.com', subjects: ['English', 'Literature'], students: 38, rating: 4.6 },
  { id: 3, name: 'Sarah Wilson', email: 'sarah@school.com', subjects: ['Biology', 'Chemistry'], students: 52, rating: 4.9 },
]

const teacherSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subjects: z.string().min(1, 'At least one subject is required'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  confirmPassword: z.string().optional()
}).refine((data) => {
  if (data.password || data.confirmPassword) {
    return data.password === data.confirmPassword
  }
  return true
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type TeacherFormData = z.infer<typeof teacherSchema>

export default function EditTeacherPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [teacher, setTeacher] = useState<any>(null)
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TeacherFormData>({
    resolver: zodResolver(teacherSchema)
  })

  useEffect(() => {
    // Simulate API call to fetch teacher data
    const teacherId = parseInt(params.id)
    const foundTeacher = mockTeachers.find(t => t.id === teacherId)
    
    if (foundTeacher) {
      setTeacher(foundTeacher)
      reset({
        name: foundTeacher.name,
        email: foundTeacher.email,
        subjects: foundTeacher.subjects.join(', ')
      })
    } else {
      toast.error('Teacher not found')
      router.push('/school-admin/dashboard')
    }
  }, [params.id, reset, router])

  const onSubmit = async (data: TeacherFormData) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, this would be an API call to update the teacher
      toast.success('Teacher updated successfully!')
      router.push('/school-admin/dashboard')
    } catch (error) {
      toast.error('Failed to update teacher. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!teacher) return null

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit Teacher</h2>
          <p className="mt-1 text-sm text-gray-600">Update teacher information</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              {...register('name')}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              {...register('email')}
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="john@school.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="subjects" className="block text-sm font-medium text-gray-700">
              Subjects (comma-separated)
            </label>
            <input
              {...register('subjects')}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Math, Physics, Chemistry"
            />
            {errors.subjects && (
              <p className="mt-1 text-sm text-red-600">{errors.subjects.message}</p>
            )}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password (Optional)</h3>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                {...register('password')}
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="mt-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                {...register('confirmPassword')}
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 