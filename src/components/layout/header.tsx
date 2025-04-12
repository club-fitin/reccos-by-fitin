'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/auth-context'

export function Header() {
  const { user, loading, signOut } = useAuth()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Reccos by Fitin
          </Link>

          <nav className="flex items-center gap-4">
            {loading ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
            ) : user ? (
              <>
                <Link href="/search" className="hover:text-gray-600">
                  Search
                </Link>
                <Link href="/my-diet" className="hover:text-gray-600">
                  My Diet
                </Link>
                <Link href="/profile" className="hover:text-gray-600">
                  Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="rounded-md bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-gray-600">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="rounded-md bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
} 