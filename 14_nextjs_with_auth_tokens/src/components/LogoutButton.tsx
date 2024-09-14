'use client';

import { logout } from '@/actions/authActions';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push('/login'); // Redirect to login after logging out
  }

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white p-2 mt-2">
      Logout
    </button>
  );
}
