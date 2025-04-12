'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function AdminDashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const checkAdminAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data: admin } = await supabase
        .from('admins')
        .select('email')
        .eq('email', user.email)
        .single()

      if (!admin) {
        router.push('/')
        return
      }
    }

    checkAdminAccess()
  }, [router, supabase])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Products</h2>
              <p className="mb-4 text-gray-600">Manage all products in the database</p>
              <button
                onClick={() => router.push('/admin/products')}
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Manage Products
              </button>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Categories</h2>
              <p className="mb-4 text-gray-600">Manage product categories</p>
              <button
                onClick={() => router.push('/admin/categories')}
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Manage Categories
              </button>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Meal Types</h2>
              <p className="mb-4 text-gray-600">Manage meal types and timing</p>
              <button
                onClick={() => router.push('/admin/meal-types')}
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Manage Meal Types
              </button>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Users</h2>
              <p className="mb-4 text-gray-600">Manage user accounts and roles</p>
              <button
                onClick={() => router.push('/admin/users')}
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Manage Users
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 