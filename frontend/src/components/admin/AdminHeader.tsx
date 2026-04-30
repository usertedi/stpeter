'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function AdminHeader() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
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
            <div className="ml-4 flex flex-shrink-0 items-center space-x-3 sm:space-x-4">
              <button type="button" className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" />
              </button>

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded-full"
                >
                  <span className="sr-only">Open user menu</span>
                  <UserCircleIcon className="h-8 w-8 text-gray-400" />
                  <span className="hidden md:block font-medium text-gray-700">Admin User</span>
                </button>

                {isProfileMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}