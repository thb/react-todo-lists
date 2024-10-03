import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { queryClient } from '@/queryClient';
import { refreshTokens } from './authApi';

export const API_URL = 'http://localhost:3000'; // Replace with your Rails API URL

const apiClient = axios.create({
  baseURL: API_URL,
});

// Request interceptor to add the Authorization header
apiClient.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => response, // Return response if it's successful
  async (error) => {
    const originalRequest = error.config;
    // Check if the error is due to an expired token
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log('apiClient response interceptor', error.response.status)

      originalRequest._retry = true;

      const { refreshToken, setTokens, clearTokens } = useAuthStore.getState();
      console.log('apiClient response auth store tokens', refreshToken)

      // Try to refresh the access token using the refresh token
      if (refreshToken) {
        try {
          const { access_token: newAccessToken, refresh_token: newRefreshToken } = await refreshTokens(refreshToken);
          console.log('apiClient response interceptor new', newAccessToken, newRefreshToken)

          setTokens(newAccessToken, newRefreshToken);

          // Retry the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // If the refresh fails, log out the user
          clearTokens();
          queryClient.clear(); // Clear React Query cache
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
