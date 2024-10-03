import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

type Action = {
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
}

// Store the authentication state and persist it in localStorage
export const useAuthStore = create<State & Action>()(
  persist<State & Action>(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      setTokens: (accessToken, refreshToken) => set(() => ({ accessToken, refreshToken, isAuthenticated: true })),
      clearTokens: () => set(() => ({ accessToken: null, refreshToken: null, isAuthenticated: false })),
    }),
    {
      name: 'auth-storage', // Store name for localStorage
    }
  )
);
