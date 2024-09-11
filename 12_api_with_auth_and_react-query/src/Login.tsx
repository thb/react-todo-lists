import React, { useState } from 'react';
import apiClient from './apiClient';
import { useAuthStore } from './useAuthStore';
import { queryClient } from './queryClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuthStore(); // Access the login action from Zustand

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await apiClient.post('/auth_tokens', {
        email,
        password,
      });

      const { access_token, refresh_token } = response.data;
      login(access_token, refresh_token); // Store the tokens in Zustand

      setError(''); // Clear any errors

      // Invalidate the tasks query after login to refetch tasks
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    } catch (error) {
      setError('Invalid email or password');
    }
  }

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-md w-full bg-white p-8">
        <h2 className="text-xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
