'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { mockUserData, mockStudentData } from '../../data/mockData';

export default function ProfileSettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profilePicture, setProfilePicture] = useState<string>('');
  const [success, setSuccess] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      let mockData = mockUserData[userData.email as keyof typeof mockUserData] || userData;
      if (mockData.userType === 'student') {
        const studentSpecificData = mockStudentData[userData.email as keyof typeof mockStudentData];
        if (studentSpecificData) {
          mockData = { ...mockData, ...studentSpecificData };
        }
      }
      setUser(mockData);
    } else {
      router.push('/login');
    }
  }, [router]);

  // Handle profile picture upload
  const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfilePicture(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle save changes (mock only updates local state)
  const handleSave = () => {
    setSuccess('Profile updated successfully!');
    setTimeout(() => setSuccess(''), 2000);
  };

  // Handle delete (mock only updates local state)
  const handleDelete = () => {
    setDeleted(true);
    setShowDeleteConfirm(false);
  };

  if (deleted) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Account Deleted</h2>
        <p>Your account has been deleted from the mock database.</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
        <p className="text-red-600">User not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
      <div className="flex flex-col items-center mb-6">
        <img
          src={profilePicture || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name)}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-2 border"
        />
        <label className="block text-sm font-medium mb-2">Change Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePicChange}
          className="mb-4"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2"
          value={user.email}
          readOnly
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={user.name}
          readOnly
        />
      </div>
      <button
        className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 mb-4"
        onClick={handleSave}
      >
        Save Changes
      </button>
      {success && <p className="text-green-600 mb-4">{success}</p>}
      <button
        className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700"
        onClick={() => setShowDeleteConfirm(true)}
      >
        Delete My Account
      </button>
      {showDeleteConfirm && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
          <p className="mb-4 text-red-700">Are you sure you want to delete your account? This action cannot be undone.</p>
          <div className="flex space-x-2">
            <button
              className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 font-semibold"
              onClick={handleDelete}
            >
              Yes, Delete
            </button>
            <button
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded font-semibold"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <button
        className="w-full mt-6 text-indigo-600 underline"
        onClick={() => router.push('/profile')}
      >
        Back to Profile
      </button>
    </div>
  );
} 