'use server'

import { createSession, getSession, deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';

const API_URL = 'http://localhost:3001';

export type MyFormState = {
  ok?: boolean | null,
  message?: string | null,
  errors?: {} | null
}

export async function login(prevState: MyFormState, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const response = await fetch(`${API_URL}/auth_tokens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include', // Inclure les cookies pour la gestion de session
  });

  if (!response.ok) {
    return {
      ok: false,
      message: 'Login failed',
      errors: { email: 'Invalid email or password' },
    }
  }

  const { access_token, refresh_token } = await response.json();

  // Create session and store tokens in cookies
  await createSession(access_token, refresh_token);

  return {
    ok: true,
    message: 'Login successful',
    errors: {},
  };
}

export async function refresh() {
  const { refreshToken } = await getSession();

  if (!refreshToken) {
    redirect('/login');
  }

  const response = await fetch(`${API_URL}/auth_tokens/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
    credentials: 'include', // Inclure les cookies pour la gestion de session
  });

  if (!response.ok) {
    throw new Error('Failed to refresh session');
  }

  const { access_token, refresh_token } = await response.json();

  // Create session and store tokens in cookies
  await createSession(access_token, refresh_token);

  redirect('/tasks');
}

export async function logout() {
  await deleteSession();
  redirect('/login');
}
