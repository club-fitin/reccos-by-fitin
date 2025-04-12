'use client'

import * as React from 'react'
import { useAuth } from '@/contexts/auth-context'

export function Header() {
  const { user, loading, signOut } = useAuth()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="text-xl font-bold">
          Reccos by Fitin
        </a>
        
        <nav>
          {!loading && (
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <a href="/products">Products</a>
                  <a href="/my-diet">My Diet</a>
                  <button onClick={() => signOut()}>Sign Out</button>
                </>
              ) : (
                <>
                  <a href="/login">Login</a>
                  <a href="/signup">Sign Up</a>
                </>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  )
} 