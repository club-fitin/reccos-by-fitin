'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useAuth } from '@/contexts/auth-context'
import { createClient } from '@/lib/supabase/client'
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
      const supabase = createClient()
      const { data, error } = await supabase
        .from('saved_products')
        .select(`
          *,
          product:product_id (
            id,
            name,
            brand_name,
            description,
            image_url,
            category_id,
            dietary_tags,
            category:category_id (
              id,
              name
            )
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setSavedProducts(data || [])
    } catch (err) {
      console.error('Error fetching saved products:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveProduct = async (savedProductId: string) => {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('saved_products')
        .delete()
        .eq('id', savedProductId)

      if (error) throw error
      
      // Update state to remove the product
      setSavedProducts(prev => prev.filter(item => item.id !== savedProductId))
    } catch (err) {
      console.error('Error removing product:', err)
    }
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 w-1/3 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="border rounded-lg p-5 flex">
                  <div className="h-20 w-20 bg-gray-200 rounded mr-4"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded mb-2 w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Diet</h1>

        {loading ? (
          <div className="animate-pulse">
            <div className="grid grid-cols-1 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="border rounded-lg p-5 flex">
                  <div className="h-20 w-20 bg-gray-200 rounded mr-4"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded mb-2 w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : savedProducts.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Your diet is empty</h2>
            <p className="text-gray-600 mb-6">Save products to build your personalized diet</p>
            <Button asChild>
              <Link href="/search">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {savedProducts.map(item => (
              <div key={item.id} className="border rounded-lg p-5 flex items-start">
                <Link href={`/products/${item.product_id}`} className="block shrink-0 mr-4">
                  {item.product.image_url ? (
                    <img 
                      src={item.product.image_url} 
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-500">No image</span>
                    </div>
                  )}
                </Link>
                
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.product_id}`} className="block">
                    <h3 className="text-lg font-semibold hover:text-blue-600">{item.product.name}</h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-1">{item.product.brand_name}</p>
                  
                  <div className="mb-2">
                    {item.product.category && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full mr-2">
                        {item.product.category.name}
                      </span>
                    )}
                    
                    {item.product.dietary_tags && item.product.dietary_tags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-full mr-2"
                      >
                        {tag}
                      </span>
                    ))}
                    
                    {item.product.dietary_tags && item.product.dietary_tags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{item.product.dietary_tags.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-700 text-sm line-clamp-2">{item.product.description}</p>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-500 hover:text-red-600 ml-2"
                  onClick={() => handleRemoveProduct(item.id)}
                  title="Remove from my diet"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
} 