'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg rounded-lg bg-white p-8 text-center shadow-md">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Something went wrong</p>
        <h1 className="mt-2 text-2xl font-bold text-secondary-900">We could not load this page.</h1>
        <p className="mt-3 text-secondary-600">
          Please try again. If the issue continues, contact the church office for help.
        </p>
        <button type="button" onClick={reset} className="btn-primary mt-6">
          Try again
        </button>
      </div>
    </div>
  );
}
