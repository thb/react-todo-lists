'use server'

import { cookies } from 'next/headers';

export type MyFormState = {
  ok?: boolean | null,
  message?: string | null,
  errors?: {} | null
}

export async function login(prevState: MyFormState, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const response = await fetch('http://localhost:3001/auth_tokens', {
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

  // Utiliser 'cookies().set()' pour définir les cookies uniquement côté serveur
  cookies().set('accessToken', access_token, { httpOnly: true, secure: true, path: '/' });
  cookies().set('refreshToken', refresh_token, { httpOnly: true, secure: true, path: '/' });

  return {
    ok: true,
    message: 'Login successful',
    errors: {},
  };
}


export async function logout() {
  // Clear the access and refresh tokens from cookies
  cookies().set('accessToken', '', { maxAge: -1 });
  cookies().set('refreshToken', '', { maxAge: -1 });
}