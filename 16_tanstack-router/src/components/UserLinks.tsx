import { useAuthStore } from '@/stores/authStore';
import { queryClient } from '@/queryClient';
import { Link } from '@tanstack/react-router';

export default function UserLinks() {
  const { isAuthenticated, clearTokens } = useAuthStore(); // Access the logout action from Zustand

  if (!isAuthenticated) {
    return <div className='p-2'><Link to="/login">Login</Link></div>
  }

  function handleLogout() {
    clearTokens(); // Clear tokens from Zustand
    queryClient.clear(); // Clear React Query cache
  }

  return <button onClick={handleLogout}>Logout</button>;
}
