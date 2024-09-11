import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
}

// Store the authentication state and persist it in localStorage
export const useAuthStore = create<AuthStore>()(
  persist<AuthStore>(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      login: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      logout: () => set({ accessToken: null, refreshToken: null }),
      setAccessToken: (token) => set({ accessToken: token }),
    }),
    {
      name: 'auth-storage', // Store name for localStorage
      storage: {
        getItem: (key) => {
          const storedValue = localStorage.getItem(key);
          return storedValue ? JSON.parse(storedValue) : null; // Parse the JSON value
        },
        setItem: (key, value) => {
          localStorage.setItem(key, JSON.stringify(value)); // Stringify the value before setting
        },
        removeItem: (key) => {
          localStorage.removeItem(key);
        },
      },
    }
  )
);
