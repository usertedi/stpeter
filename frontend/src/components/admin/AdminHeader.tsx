'use client';

import { useRouter } from 'next/navigation';

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear token from both localStorage and cookies
    localStorage.removeItem('token');
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-20 bg-white shadow-sm">
      <div className="px-4 pl-20 sm:px-6 md:pl-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex min-w-0 flex-1 items-center justify-between">
            <div className="flex min-w-0 items-center">
              <h1 className="truncate text-lg font-semibold text-gray-800 sm:text-xl md:text-2xl">Admin Dashboard</h1>
            </div>
            <div className="ml-4 flex flex-shrink-0 items-center">
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}