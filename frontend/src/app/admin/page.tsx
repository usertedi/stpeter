"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { apiFetch } from '@/lib/api';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Check for token in both localStorage and cookies
      const localToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const cookieToken = typeof window !== 'undefined' ? document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1] : null;
      
      const token = localToken || cookieToken;
      if (!token) {
        router.replace('/admin/login');
        setIsLoading(false);
        return;
      }

      try {
        // Validate token with backend using the /api/auth/me endpoint
        const response = await apiFetch('/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok && data.success && data.data && data.data.isAdmin === true) {
          setIsAuthenticated(true);
        } else {
          // Clear invalid token
          localStorage.removeItem('token');
          document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          router.replace('/admin/login');
        }
      } catch (error) {
        console.error('Error validating token:', error);
        localStorage.removeItem('token');
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        router.replace('/admin/login');
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminDashboard />
    </div>
  );
}