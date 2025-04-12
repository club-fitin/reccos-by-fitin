'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useAuth } from '@/contexts/auth-context'

interface Product {
  id: string
  name: string
  description: string
  category: string
  image_url: string
  rating: number
  expert_review: string
  ingredients: string[]
  benefits: string[]
  usage_instructions: string
}

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', params.id)
          .single()

        if (error) throw error
        setProduct(data)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred while fetching the product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id, user])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">Loading...</div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
              {error || 'Product not found'}
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
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <img
                src={product.image_url}
                alt={product.name}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="mt-2 text-sm text-gray-600">{product.category}</p>
              <div className="mt-4 flex items-center">
                <span className="text-sm font-medium text-gray-900">
                  Rating: {product.rating}/5
                </span>
              </div>
              <p className="mt-4 text-gray-700">{product.description}</p>

              <div className="mt-6">
                <h2 className="text-xl font-semibold">Expert Review</h2>
                <p className="mt-2 text-gray-700">{product.expert_review}</p>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold">Ingredients</h2>
                <ul className="mt-2 list-disc pl-4 text-gray-700">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold">Benefits</h2>
                <ul className="mt-2 list-disc pl-4 text-gray-700">
                  {product.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold">Usage Instructions</h2>
                <p className="mt-2 text-gray-700">{product.usage_instructions}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 