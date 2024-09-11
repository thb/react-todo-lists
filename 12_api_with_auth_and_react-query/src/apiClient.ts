import axios from 'axios';
import { useAuthStore } from './useAuthStore';
import { queryClient } from './queryClient';

const API_URL = 'http://localhost:3000'; // Replace with your Rails API URL

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
      originalRequest._retry = true;

      const { refreshToken, setAccessToken, logout } = useAuthStore.getState();

      // Try to refresh the access token using the refresh token
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_URL}/auth_tokens/refresh`, {
            refresh_token: refreshToken,
          });

          const newAccessToken = response.data.access_token;
          setAccessToken(newAccessToken);

          // Retry the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // If the refresh fails, log out the user
          logout();
          queryClient.clear(); // Clear React Query cache
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
