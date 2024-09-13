'use server'

import { cookies } from "next/headers";

export async function apiClient(endpoint: string, method = 'GET', data?: any) {
  const url = `http://localhost:3001${endpoint}`;

  let accessToken = cookies().get('accessToken')?.value;

  if (!accessToken) {
    throw new Error('Access token not found. Please log in.');
  }

  // Initialize headers as an object if it's undefined
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`  // Safely add the Authorization header
  };

  const options: RequestInit = {
    method,
    headers,  // Use the initialized headers
    credentials: 'include',
    ...(data && { body: JSON.stringify(data) }),
  };

  let response = await fetch(url, options);

  if (response.status === 401) {
    // Attempt to refresh the token if unauthorized
    await refreshToken();

    // Retry the request with the new access token
    accessToken = cookies().get('accessToken')?.value;
    options.headers = {
      ...headers,
      'Authorization': `Bearer ${accessToken}`
    };

    response = await fetch(url, options);
  }

  if (!response.ok) {
    throw new Error('API request failed');
  }

  return response.json();
}

// Function to refresh the access token using the refresh token
async function refreshToken() {
  const refreshToken = cookies().get('refreshToken')?.value;

  if (!refreshToken) {
    throw new Error('Refresh token not found');
  }

  const response = await fetch('http://localhost:3001/auth_tokens/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh access token');
  }

  const { access_token } = await response.json();
  cookies().set('accessToken', access_token, { httpOnly: true, secure: true });
}
