import { login, MyFormState } from '@/actions/authActions';
import { useFormState } from 'react-dom';
import { redirect, useRouter } from 'next/navigation';  // Import router for redirection
import { useEffect } from 'react';
import LoginForm from './LoginForm';
import { getSession } from '@/lib/session';

export default async function LoginPage() {

  const session = await getSession();

  if (session && session.accessToken && session.refreshToken) {
    redirect('/tasks');
  }

  return <LoginForm session={session} />
}
