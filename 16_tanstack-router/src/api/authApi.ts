// src/api/authApi.ts
import axios from 'axios';
import { API_URL } from './apiClient';

export const createTokens = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth_tokens`, { email, password });
  return response.data;
};

export const refreshTokens = async (refresh_token: string) => {
  const response = await axios.post(`${API_URL}/auth_tokens/refresh`, { refresh_token });
  return response.data;
};

export const deleteTokens = async (refresh_token: string) => {
  await axios.delete(`${API_URL}/auth_tokens`, { data: { refresh_token } });
  return true;
}
