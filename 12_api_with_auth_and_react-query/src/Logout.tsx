import { useAuthStore } from './useAuthStore';
import { queryClient } from './queryClient';

export default function Logout() {
  const { logout } = useAuthStore(); // Access the logout action from Zustand

  function handleLogout() {
    logout(); // Clear tokens from Zustand
    queryClient.clear(); // Clear React Query cache
  }

  return <button onClick={handleLogout}>Logout</button>;
}
