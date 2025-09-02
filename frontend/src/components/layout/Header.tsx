'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Divisions', href: '/divisions' },
  { name: 'Events', href: '/events' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-custom flex items-center justify-between py-4" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">St. Peter Orthodox Church</span>
            <div className="h-10 w-auto flex items-center">
              {/* Replace with your actual logo */}
              <span className="text-xl font-serif font-bold text-primary-700">St. Peter Orthodox Church</span>
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm font-medium ${isActive ? 'text-primary-700' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-primary-600"
                    layoutId="navbar-indicator"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="/admin" className="text-sm font-medium text-gray-700 hover:text-primary-600">
            Admin <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden ${mobileMenuOpen ? 'fixed inset-0 z-50' : 'hidden'}"}`}>
        <div className="fixed inset-0 bg-black/25" aria-hidden="true" onClick={() => setMobileMenuOpen(false)} />
        
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">St. Peter Orthodox Church</span>
              <div className="h-8 w-auto">
                <span className="text-lg font-serif font-bold text-primary-700">St. Peter Orthodox Church</span>
              </div>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-medium ${isActive ? 'text-primary-700 bg-primary-50' : 'text-gray-700 hover:bg-gray-50'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </div>
              <div className="py-6">
                <Link
                  href="/admin"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}