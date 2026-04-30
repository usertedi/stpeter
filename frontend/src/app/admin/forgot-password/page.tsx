'use client';

import { useState } from 'react';
import Link from 'next/link';
import { apiFetch, getApiErrorMessage } from '@/lib/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    try {
      setLoading(true);
      const response = await apiFetch('/auth/forgotpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(await getApiErrorMessage(response, 'Unable to send reset instructions'));
      }

      setMessage('If that email exists, reset instructions have been sent.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send reset instructions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-2xl font-bold text-gray-900">Forgot Password</h1>
        <p className="mt-2 text-sm text-gray-600">Enter your admin email to receive reset instructions.</p>

        {message && <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-700">{message}</div>}
        {error && <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Sending...' : 'Send reset instructions'}
          </button>
        </form>

        <Link href="/admin/login" className="mt-4 inline-block text-sm text-primary-600 hover:underline">
          Back to login
        </Link>
      </div>
    </div>
  );
}
