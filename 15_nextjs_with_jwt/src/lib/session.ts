// src/lib/session.ts
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose'; // For signing and verifying JWT

const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
  throw new Error('SESSION_SECRET is not defined');
}

const encodedKey = new TextEncoder().encode(secretKey);

export async function decrypt(token: string | undefined) {
  if (!token) return null;

  try {

    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.error('Failed to verify session:', error);
    return null;
  }
}

export async function setSession(token: string) {
  cookies().set('token', token, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
  });
}

export async function getSession() {
  const token = cookies().get('token')?.value;

  if (!token) {
    return null;
  }

  const payload = await decrypt(token);
  return { ...payload, token };
}

export async function deleteSession() {
  cookies().delete('token');
}