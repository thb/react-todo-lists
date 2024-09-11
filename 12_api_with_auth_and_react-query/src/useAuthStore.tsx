import create from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
}

// Explicit type for the persist middleware to handle the AuthStore state
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
      name: 'auth-storage', // Key for localStorage
      getStorage: () => localStorage, // Optional, default is localStorage
    }
  )
);
