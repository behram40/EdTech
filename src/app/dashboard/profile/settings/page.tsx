import { useRouter } from 'next/navigation';

export default function ProfileSettingsPage() {
  const router = useRouter();

  return (
    <button
      className="w-full mt-6 text-indigo-600 underline"
      onClick={() => router.push('/profile')}
    >
      Back to Profile
    </button>
  );
} 