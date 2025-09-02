import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Admin Dashboard | St. Peter Orthodox Church',
  description: 'Admin dashboard for managing church content',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}