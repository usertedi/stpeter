import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/admin/AdminDashboard';

export const metadata = {
  title: 'Admin Dashboard | St. Peter Orthodox Church',
  description: 'Admin dashboard for managing church content.',
};

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.replace('/admin/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminDashboard />
    </div>
  );
}