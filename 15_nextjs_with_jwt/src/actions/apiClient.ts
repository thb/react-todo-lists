'use server';

import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

const API_URL = 'http://localhost:3001';

export async function apiClient(endpoint: string, method = 'GET', data?: any) {
  const url = `${API_URL}${endpoint}`;

  const session = await getSession();

  // Vérifier si la session est valide
  if (!session) {
    redirect('/login');
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${session.token}`,
  };

  const options: RequestInit = {
    method,
    headers,
    credentials: 'include',
    ...(data && { body: JSON.stringify(data) }), // Include body if data is provided
  };

  // Perform the API request
  let response = await fetch(url, options);

  // If 401 Unauthorized, try to refresh tokens by calling the refresh API route
  if (response.status === 401) {
    redirect('/login');
  }

  // Handle non-successful responses
  if (!response.ok) {
    throw new Error('API request failed.');
  }

  return response.json();
}
