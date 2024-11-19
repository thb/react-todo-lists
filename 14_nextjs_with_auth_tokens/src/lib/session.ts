'use server'

import 'server-only'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server';

export async function createSession(accessToken: string, refreshToken: string) {
  cookies().set('accessToken', accessToken, { httpOnly: true, secure: true, path: '/' });
  cookies().set('refreshToken', refreshToken, { httpOnly: true, secure: true, path: '/' });
}

export async function deleteSession() {
  cookies().set('accessToken', '', { maxAge: -1 });
  cookies().set('refreshToken', '', { maxAge: -1 });
}

export async function getSession() {
  const accessToken = cookies().get('accessToken')?.value;
  const refreshToken = cookies().get('refreshToken')?.value;
  return { accessToken, refreshToken };
}
