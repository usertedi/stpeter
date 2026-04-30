'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { apiFetch, getApiErrorMessage } from '@/lib/api';

export default function ResetPasswordPage() {
  const params = useParams<{ token: string }>();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const response = await apiFetch(`/auth/resetpassword/${params.token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error(await getApiErrorMessage(response, 'Password reset failed'));
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        const isProduction = window.location.protocol === 'https:';
        document.cookie = `token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}${isProduction ? '; secure' : ''}; samesite=strict`;
      }

      setSuccess(true);
      setTimeout(() => router.replace('/admin'), 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Password reset failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
        <p className="mt-2 text-sm text-gray-600">Choose a new admin password.</p>

        {error && <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        {success && <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-700">Password updated. Redirecting...</div>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
              required
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
              Confirm password
            </label>
            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Updating...' : 'Update password'}
          </button>
        </form>

        <Link href="/admin/login" className="mt-4 inline-block text-sm text-primary-600 hover:underline">
          Back to login
        </Link>
      </div>
    </div>
  );
}
