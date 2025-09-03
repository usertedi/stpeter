"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // Check for token in both localStorage and cookies
      const localToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const cookieToken = typeof window !== 'undefined' ? document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1] : null;
      
      const token = localToken || cookieToken;
      console.log('Admin page - checking token:', token);
      
      if (!token) {
        console.log('No token found, redirecting to login');
        router.replace('/admin/login');
      } else {
        console.log('Token found, setting authenticated');
        setIsAuthenticated(true);
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