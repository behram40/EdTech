'use client';

import { useState } from 'react';
import { accounts as initialAccounts, Account } from '@/data/accounts';

export default function DeleteAccountPage() {
  // For demo: keep accounts in local state (in-memory only)
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = () => {
    if (!selectedEmail) {
      setError('Please select your account.');
      return;
    }
    setAccounts(prev => prev.filter(acc => acc.email !== selectedEmail));
    setDeleted(true);
    setError('');
  };

  if (deleted) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Account Deleted</h2>
        <p>Your account has been deleted from the mock database.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Delete Your Account</h2>
      <label className="block mb-2 font-medium">Select your account:</label>
      <select
        className="w-full border rounded px-3 py-2 mb-4"
        value={selectedEmail}
        onChange={e => setSelectedEmail(e.target.value)}
      >
        <option value="">-- Select account --</option>
        {accounts.map(acc => (
          <option key={acc.email} value={acc.email}>
            {acc.name} ({acc.email})
          </option>
        ))}
      </select>
      <button
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 font-semibold"
        onClick={handleDelete}
      >
        Delete Account
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
} 