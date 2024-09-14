'use client';

import { login, MyFormState } from '@/actions/authActions';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';  // Import router for redirection

export default function LoginPage() {

  const router = useRouter();  // Use the router for navigation
  const initialState = { ok: null, message: null, errors: null } as MyFormState;
  const [state, formAction] = useFormState(login, initialState);

  // If login is successful, redirect to '/tasks'
  if (state.ok) {
    router.push('/tasks');  // Redirect after successful login
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full bg-white p-8">
        <h2 className="text-xl font-bold mb-6 text-center">Login</h2>
        {state.message && <p className={`text-center ${state.ok ? 'text-green-500' : 'text-red-500'} mb-4`}>{JSON.stringify(state.message)}</p>}
        {state.errors && <p className="text-red-500 mb-4">{JSON.stringify(state.errors)}</p>}
        <form action={formAction} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
