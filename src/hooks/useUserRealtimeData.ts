import { useEffect, useState } from 'react'
import { supabase, subscribeToTable, RealtimeCallback } from '@/lib/supabase/client'
import { Product, SavedProduct } from '@/types'

interface SavedProductWithDetails {
  product_id: string
  products: Product
}

export function useUserRealtimeData(userId: string) {
  const [savedProducts, setSavedProducts] = useState<Product[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial data fetch
    const fetchSavedProducts = () => {
      supabase
        .from('user_saved_products')
        .select(`
          product_id,
          products (
            id,
            name,
            slug,
            brand_name,
            description,
            image_url,
            category_id,
            nutritional_info,
            dietary_tags,
            platform_links,
            status
          )
        `)
        .eq('user_id', userId)
        .order('saved_at', { ascending: false })
        .then(({ data, error }) => {
          if (error) {
            setError(error)
          } else {
            const products = (data as unknown as SavedProductWithDetails[]).map(item => item.products)
            setSavedProducts(products)
          }
          setLoading(false)
        })
    }

    fetchSavedProducts()

    // Set up real-time subscription for saved products
    const callback: RealtimeCallback<SavedProduct> = ({ new: newRecord, old: oldRecord, eventType }) => {
      if (eventType === 'INSERT' && newRecord) {
        // Fetch the newly saved product
        supabase
          .from('products')
          .select('*')
          .eq('id', newRecord.product_id)
          .single()
          .then(({ data }) => {
            if (data) {
              setSavedProducts(prev => [data as Product, ...prev])
            }
          })
      } else if (eventType === 'DELETE' && oldRecord) {
        setSavedProducts(prev => prev.filter(product => product.id !== oldRecord.product_id))
      }
    }

    const unsubscribe = subscribeToTable<SavedProduct>(
      'user_saved_products',
      callback,
      `user_id=eq.${userId}`
    )

    // Cleanup subscription on unmount
    return () => {
      unsubscribe()
    }
  }, [userId])

  // Save/unsave product operations
  const saveProduct = (productId: string) => {
    return supabase
      .from('user_saved_products')
      .insert({
        user_id: userId,
        product_id: productId
      })
  }

  const unsaveProduct = (productId: string) => {
    return supabase
      .from('user_saved_products')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId)
  }

  return {
    savedProducts,
    error,
    loading,
    saveProduct,
    unsaveProduct
  }
} 