'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { ArrowLeft, Bookmark, BookmarkCheck, ExternalLink, Share, AlertCircle } from 'lucide-react'

interface Product {
  id: string
  name: string
  slug: string
  brand_name: string
  description: string | null
  ingredients: string | null
  image_url: string | null
  category_id: string
  nutritional_info: Record<string, any> | null
  dietary_tags: string[] | null
  platform_links: Record<string, string> | null
  status: 'DRAFT' | 'PUBLISHED'
  created_at: string
  category: {
    id: string
    name: string
  } | null
}

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [savingStatus, setSavingStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const productId = params?.id as string

  useEffect(() => {
    if (productId) {
      fetchProduct()
      if (user) {
        checkIfSaved()
      }
    }
  }, [productId, user])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:category_id (
            id,
            name
          )
        `)
        .eq('id', productId)
        .eq('status', 'PUBLISHED')
        .single()

      if (error) throw error
      
      setProduct(data)
    } catch (err) {
      console.error('Error fetching product:', err)
      router.push('/search')
    } finally {
      setLoading(false)
    }
  }

  const checkIfSaved = async () => {
    if (!user) return
    
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('saved_products')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .maybeSingle()

      if (error) throw error
      
      setIsSaved(!!data)
    } catch (err) {
      console.error('Error checking saved status:', err)
    }
  }

  const toggleSave = async () => {
    if (!user) {
      router.push('/login')
      return
    }

    try {
      setSavingStatus('saving')
      const supabase = createClient()
      
      if (isSaved) {
        // Delete from saved products
        const { error } = await supabase
          .from('saved_products')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId)
        
        if (error) throw error
        
        setIsSaved(false)
      } else {
        // Add to saved products
        const { error } = await supabase
          .from('saved_products')
          .insert({
            user_id: user.id,
            product_id: productId
          })
        
        if (error) throw error
        
        setIsSaved(true)
      }
      
      setSavingStatus('success')
    } catch (err) {
      console.error('Error toggling saved status:', err)
      setSavingStatus('error')
    } finally {
      setTimeout(() => setSavingStatus('idle'), 2000)
    }
  }

  const handleShare = async () => {
    if (navigator.share && product) {
      try {
        await navigator.share({
          title: `Reccos by Fitin: ${product.name}`,
          text: `Check out ${product.name} on Reccos by Fitin!`,
          url: window.location.href,
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: 'Link copied',
        description: 'Product link copied to clipboard',
      })
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="col-span-1">
                <div className="h-80 bg-gray-200 rounded-lg mb-4"></div>
              </div>
              
              <div className="col-span-2">
                <div className="h-10 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
                
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="flex gap-2 mb-6">
                  <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                </div>
                
                <div className="flex gap-2">
                  <div className="h-10 w-32 bg-gray-200 rounded"></div>
                  <div className="h-10 w-32 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <AlertCircle className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
            <p className="text-gray-600 mb-6">This product doesn't exist or has been removed.</p>
            <Button onClick={() => router.push('/search')}>
              Browse Products
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const formatNutritionalInfo = (info: Record<string, any> | null) => {
    if (!info) return []
    
    return Object.entries(info).map(([key, value]) => {
      return {
        name: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        value: typeof value === 'number' ? value.toString() : value,
        unit: key.includes('calorie') ? 'kcal' : 'g'
      }
    })
  }

  const nutritionalInfo = formatNutritionalInfo(product.nutritional_info)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-2 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">{product.name}</h1>
            <p className="text-gray-600">{product.brand_name}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSave}
              disabled={savingStatus === 'saving'}
              className={isSaved ? 'text-green-600 border-green-600 hover:bg-green-50 hover:text-green-600' : ''}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="mr-1 h-4 w-4" />
                  Saved
                </>
              ) : (
                <>
                  <Bookmark className="mr-1 h-4 w-4" />
                  Save
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Product image */}
          <div className="col-span-1">
            {product.image_url ? (
              <img 
                src={product.image_url} 
                alt={product.name}
                className="w-full h-auto max-h-80 object-contain rounded-lg border shadow"
              />
            ) : (
              <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-lg border">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>
          
          {/* Product details */}
          <div className="col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-0">
                {product.description ? (
                  <div className="prose max-w-none mb-6">
                    <p>{product.description}</p>
                  </div>
                ) : (
                  <p className="text-gray-500 mb-6">No description available</p>
                )}
                
                {product.category && (
                  <div className="mb-3">
                    <p className="font-semibold mb-2">Category</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {product.category.name}
                      </span>
                    </div>
                  </div>
                )}
                
                {product.dietary_tags && product.dietary_tags.length > 0 && (
                  <div className="mb-6">
                    <p className="font-semibold mb-2">Dietary Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {product.dietary_tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {product.platform_links && Object.keys(product.platform_links).length > 0 && (
                  <div>
                    <p className="font-semibold mb-2">Buy Online</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(product.platform_links).map(([platform, url], index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <a href={url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-1 h-4 w-4" />
                            {platform}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="ingredients" className="mt-0">
                {product.ingredients ? (
                  <div className="prose max-w-none">
                    <p>{product.ingredients}</p>
                  </div>
                ) : (
                  <p className="text-gray-500">No ingredients information available</p>
                )}
              </TabsContent>
              
              <TabsContent value="nutrition" className="mt-0">
                {nutritionalInfo.length > 0 ? (
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-2 text-left">Nutrient</th>
                          <th className="px-4 py-2 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {nutritionalInfo.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-4 py-2 border-t">{item.name}</td>
                            <td className="px-4 py-2 text-right border-t">
                              {item.value} {item.unit}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">No nutritional information available</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 