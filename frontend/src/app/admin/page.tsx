"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/admin/AdminDashboard';

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
      console.log('Admin page - checking token:', token);
      
      if (!token) {
        console.log('No token found, redirecting to login');
        router.replace('/admin/login');
        setIsLoading(false);
        return;
      }

      try {
        console.log('Validating token with API:', `${process.env.NEXT_PUBLIC_API_URL}/auth/me`);
        // Validate token with backend using the /auth/me endpoint
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('API response status:', response.status);
        const data = await response.json();
        console.log('Token validation response:', data);
        console.log('Response data structure:', JSON.stringify(data, null, 2));
        console.log('Checking data.data:', data.data);
        console.log('Checking data.data.role:', data.data?.role);

        if (response.ok && data.success && data.data && data.data.isAdmin === true) {
          console.log('Token valid and user is admin, setting authenticated');
          setIsAuthenticated(true);
        } else {
          console.log('Token invalid or user not admin, redirecting to login');
          console.log('Response data:', data);
          // Clear invalid token
          localStorage.removeItem('token');
          document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          router.replace('/admin/login');
        }
      } catch (error) {
        console.error('Error validating token:', error);
        console.log('API validation failed, but token exists. Checking if we can proceed...');
        
        // If API call fails but we have a token, try to decode it locally as fallback
        try {
          const tokenParts = token.split('.');
          if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            console.log('Decoded token payload:', payload);
            
            // Check if token is not expired and has admin role
            if (payload.exp && payload.exp > Date.now() / 1000 && payload.isAdmin === true) {
              console.log('Token is valid locally, proceeding with authentication');
              setIsAuthenticated(true);
            } else {
              console.log('Token is expired or not admin, redirecting to login');
              localStorage.removeItem('token');
              document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
              router.replace('/admin/login');
            }
          } else {
            console.log('Invalid token format, redirecting to login');
            localStorage.removeItem('token');
            document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            router.replace('/admin/login');
          }
        } catch (decodeError) {
          console.error('Error decoding token:', decodeError);
          localStorage.removeItem('token');
          document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          router.replace('/admin/login');
        }
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