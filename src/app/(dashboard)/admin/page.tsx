'use client'

import { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import {
  UserPlusIcon,
  TrashIcon,
  PencilIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { mockUserData, mockStudentData } from '@/app/(dashboard)/data/mockData'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function AdminPanel() {
  const [selectedTab, setSelectedTab] = useState(0)
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showAddCourseModal, setShowAddCourseModal] = useState(false)
  const [teachers, setTeachers] = useState<any[]>([])
  const [students, setStudents] = useState<any[]>([])
  const [editUser, setEditUser] = useState<any | null>(null)

  useEffect(() => {
    setTeachers(Object.values(mockUserData).filter((u: any) => u.userType === 'teacher'))
    setStudents(Object.values(mockStudentData))
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Admin Panel</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowAddUserModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <UserPlusIcon className="h-5 w-5 mr-2" />
            Add User
          </button>
          <button
            onClick={() => setShowAddCourseModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Course
          </button>
        </div>
      </div>

      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white text-indigo-600 shadow'
                  : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
              )
            }
          >
            User Management
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white text-indigo-600 shadow'
                  : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
              )
            }
          >
            Students
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white text-indigo-600 shadow'
                  : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
              )
            }
          >
            Course Management
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-6">
          {/* User Management Panel */}
          <Tab.Panel>
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <h2 className="text-lg font-semibold mb-4">Teachers</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Subjects</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Avg Rating</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase"># Students</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
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
                        <td className="px-4 py-2 whitespace-nowrap text-right">
                          <button
                            onClick={() => setEditUser(t)}
                            className="inline-flex items-center px-2 py-1 mr-2 text-xs font-medium rounded bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                          >
                            <PencilIcon className="h-4 w-4 mr-1" />Edit
                          </button>
                          <button
                            onClick={() => setTeachers(teachers.filter((teacher) => teacher.email !== t.email))}
                            className="inline-flex items-center px-2 py-1 text-xs font-medium rounded bg-red-100 text-red-800 hover:bg-red-200"
                          >
                            <TrashIcon className="h-4 w-4 mr-1" />Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Tab.Panel>

          {/* Students Panel */}
          <Tab.Panel>
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <h2 className="text-lg font-semibold mb-4">All Students</h2>
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
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
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
                        <td className="px-4 py-2 whitespace-nowrap text-right">
                          <button
                            onClick={() => setEditUser(s)}
                            className="inline-flex items-center px-2 py-1 mr-2 text-xs font-medium rounded bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                          >
                            <PencilIcon className="h-4 w-4 mr-1" />Edit
                          </button>
                          <button
                            onClick={() => setStudents(students.filter((student) => student.email !== s.email))}
                            className="inline-flex items-center px-2 py-1 text-xs font-medium rounded bg-red-100 text-red-800 hover:bg-red-200"
                          >
                            <TrashIcon className="h-4 w-4 mr-1" />Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Tab.Panel>

          {/* Course Management Panel */}
          <Tab.Panel>
            <div className="bg-white shadow-sm rounded-lg overflow-hidden p-6">
              <h2 className="text-lg font-semibold mb-4">Course Management</h2>
              <p className="text-gray-600">Course management functionality coming soon.</p>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add New User</h3>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {showAddCourseModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add New Course</h3>
              <button
                onClick={() => setShowAddCourseModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Title</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                  <option value="computer-science">Computer Science</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="biology">Biology</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Instructor</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                  <option value="john-smith">John Smith</option>
                  <option value="sarah-wilson">Sarah Wilson</option>
                  <option value="michael-brown">Michael Brown</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddCourseModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Edit User</h3>
              <button
                onClick={() => setEditUser(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form
              className="space-y-4"
              onSubmit={e => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                const email = (form.elements.namedItem('email') as HTMLInputElement).value;
                const role = (form.elements.namedItem('role') as HTMLSelectElement).value;
                if (editUser.userType === 'teacher') {
                  setTeachers(teachers.map(t => t.email === editUser.email ? { ...t, name, email } : t));
                } else {
                  setStudents(students.map(s => s.email === editUser.email ? { ...s, name, email } : s));
                }
                setEditUser(null);
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  name="name"
                  type="text"
                  defaultValue={editUser.name}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  defaultValue={editUser.email}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  name="role"
                  defaultValue={editUser.userType}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  disabled
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditUser(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 