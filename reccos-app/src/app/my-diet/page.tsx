'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useAuth } from '@/contexts/auth-context'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  brand_name: string
  description: string
  image_url: string | null
  category_id: string
  dietary_tags: string[] | null
  category: {
    id: string
    name: string
  } | null
}

interface SavedProduct {
  id: string
  user_id: string
  product_id: string
  created_at: string
  product: Product
}

export default function MyDietPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login?redirect=/my-diet')
        return
      }
      fetchSavedProducts()
    }
  }, [user, authLoading])

  const fetchSavedProducts = async () => {
    if (!user) return

    try {
      setLoading(true)
      const response = await supabase
        .from<SavedProduct>('saved_products')
        .select(`
          *,
          product:product_id (
            id,
            name,
            brand_name,
            image_url,
            category_id,
            category:category_id (
              id,
              name
            )
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (response.error) throw response.error
      
      setSavedProducts(response.data || [])
    } catch (err) {
      console.error('Error fetching saved products:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveProduct = async (savedProductId: string) => {
    try {
      await new Promise((resolve) => {
        supabase
          .from('saved_products')
          .delete()
          .eq('id', savedProductId)
          .then(resolve)
      })
      
      // Update state to remove the product
      setSavedProducts(prev => prev.filter(item => item.id !== savedProductId))
    } catch (err) {
      console.error('Error removing product:', err)
    }
  }

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Diet</h1>
        {savedProducts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">You haven't saved any products yet.</p>
            <Button asChild>
              <Link href="/search">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProducts.map((savedProduct) => (
              <div key={savedProduct.id} className="border rounded-lg overflow-hidden">
                <div className="aspect-square relative">
                  {savedProduct.product.image_url ? (
                    <img
                      src={savedProduct.product.image_url}
                      alt={savedProduct.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{savedProduct.product.name}</h3>
                  <p className="text-sm text-gray-500">{savedProduct.product.brand_name}</p>
                  <p className="text-sm mt-2 line-clamp-2">{savedProduct.product.description}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveProduct(savedProduct.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link href={`/products/${savedProduct.product.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
} 