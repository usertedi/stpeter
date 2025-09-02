'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  UsersIcon, 
  CalendarIcon, 
  PhotoIcon, 
  EnvelopeIcon, 
  UserGroupIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

type AdminView = 'dashboard' | 'divisions' | 'events' | 'gallery' | 'contact' | 'users';

interface AdminSidebarProps {
  currentView: AdminView;
  setCurrentView: (view: AdminView) => void;
}

export default function AdminSidebar({ currentView, setCurrentView }: AdminSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: HomeIcon },
    { id: 'divisions', name: 'Divisions', icon: UserGroupIcon },
    { id: 'events', name: 'Events', icon: CalendarIcon },
    { id: 'gallery', name: 'Gallery', icon: PhotoIcon },
    { id: 'contact', name: 'Contact Messages', icon: EnvelopeIcon },
    { id: 'users', name: 'Users', icon: UsersIcon },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-0 left-0 z-40 p-4 md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="p-2 text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-0 z-30 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden transition-transform duration-300 ease-in-out`}
      >
        <div className="relative flex flex-col w-64 h-full bg-primary-800 text-white">
          <div className="flex items-center justify-center h-16 bg-primary-900">
            <h2 className="text-xl font-bold">Admin Portal</h2>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <a
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id as AdminView);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md cursor-pointer ${isActive ? 'bg-primary-700 text-white' : 'text-primary-100 hover:bg-primary-700'}`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </a>
              );
            })}
          </nav>
          <div className="p-4 border-t border-primary-700">
            <Link href="/" className="flex items-center text-sm font-medium text-primary-100 hover:text-white">
              <span>Return to Website</span>
            </Link>
          </div>
        </div>
        <div 
          className="absolute inset-0 bg-gray-600 bg-opacity-75" 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-primary-800 text-white">
        <div className="flex items-center justify-center h-16 bg-primary-900">
          <h2 className="text-xl font-bold">Admin Portal</h2>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <a
                key={item.id}
                onClick={() => setCurrentView(item.id as AdminView)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md cursor-pointer ${isActive ? 'bg-primary-700 text-white' : 'text-primary-100 hover:bg-primary-700'}`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </a>
            );
          })}
        </nav>
        <div className="p-4 border-t border-primary-700">
          <Link href="/" className="flex items-center text-sm font-medium text-primary-100 hover:text-white">
            <span>Return to Website</span>
          </Link>
        </div>
      </div>
    </>
  );
}