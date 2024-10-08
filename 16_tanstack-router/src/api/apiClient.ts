import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { queryClient } from '@/queryClient';
import { refreshTokens } from './authApi';

export const API_URL = 'http://localhost:3000'; // Replace with your Rails API URL

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log('apiClient response interceptor', error.response.status)

      originalRequest._retry = true;

      const { refreshToken, setTokens, clearTokens } = useAuthStore.getState();
      if (refreshToken) {
        try {
          const { access_token: newAccessToken, refresh_token: newRefreshToken } = await refreshTokens(refreshToken);
          console.log('apiClient response interceptor new', newAccessToken, newRefreshToken)

          setTokens(newAccessToken, newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          clearTokens();
          queryClient.clear();
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
