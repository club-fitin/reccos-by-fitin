"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import Link from 'next/link'
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useAuth } from '@/contexts/auth-context'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useToast } from '@/components/ui/use-toast'
import { ArrowLeft, Bookmark, BookmarkCheck, ExternalLink, Share, AlertCircle } from "lucide-react"
import { supabase } from '@/lib/supabase/client'

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
  platform_links: string[] | null
  status: 'DRAFT' | 'PUBLISHED'
  created_at: string
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
  const slug = params.slug as string

  useEffect(() => {
    if (slug) {
      fetchProduct()
      if (user) {
        checkIfSaved()
      }
    }
  }, [slug, user])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await supabase
        .from<Product>('products')
        .select(`
          *,
          category:category_id (
            id,
            name
          )
        `)
        .eq('slug', slug)
        .eq('status', 'PUBLISHED')
        .single()

      if (response.error) throw response.error
      
      setProduct(response.data)
    } catch (err) {
      console.error('Error fetching product:', err)
      router.push('/search')
    } finally {
      setLoading(false)
    }
  }

  const checkIfSaved = async () => {
    if (!user || !product) return
    
    try {
      const response = await supabase
        .from<SavedProduct>('saved_products')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', product.id)
        .maybeSingle()

      if (response.error) throw response.error
      
      setIsSaved(!!response.data)
    } catch (err) {
      console.error('Error checking saved status:', err)
    }
  }

  const handleSaveProduct = async () => {
    if (!user) {
      router.push('/login')
      return
    }

    if (!product) return

    try {
      setSavingStatus('saving')
      const response = await supabase
        .from<SavedProduct>('saved_products')
        .insert({
          user_id: user.id,
          product_id: product.id
        })

      if (response.error) throw response.error
      
      setIsSaved(true)
      setSavingStatus('success')
      toast({
        title: 'Product saved',
        description: 'Product has been added to your diet',
      })
    } catch (err) {
      console.error('Error saving product:', err)
      setSavingStatus('error')
      toast({
        title: 'Error',
        description: 'Failed to save product. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setTimeout(() => setSavingStatus('idle'), 2000)
    }
  }

  const handleUnsaveProduct = async () => {
    if (!user || !product) return

    try {
      setSavingStatus('saving')
      const response = await supabase
        .from<SavedProduct>('saved_products')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', product.id)

      if (response.error) throw response.error
      
      setIsSaved(false)
      setSavingStatus('success')
      toast({
        title: 'Product removed',
        description: 'Product has been removed from your diet',
      })
    } catch (err) {
      console.error('Error unsaving product:', err)
      setSavingStatus('error')
      toast({
        title: 'Error',
        description: 'Failed to remove product. Please try again.',
        variant: 'destructive',
      })
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
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto p-4 flex items-center justify-center">
          <div className="animate-pulse w-full max-w-4xl">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
                
                <div className="flex gap-2 mb-4">
                  <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                </div>
                
                <div className="flex gap-2">
                  <div className="h-10 w-24 bg-gray-200 rounded"></div>
                  <div className="h-10 w-24 bg-gray-200 rounded"></div>
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
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto p-4 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Product not found</h2>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Link href="/search">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Browse Products
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <div className="mb-6">
          <Link href="/search" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Search
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
          </div>
          <div>
            <div className="mb-2">
              <p className="text-sm font-medium text-green-600">
                {product.brand_name}
              </p>
              {product.category && (
                <p className="text-xs text-gray-500">
                  {product.category.name}
                </p>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {product.dietary_tags && product.dietary_tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex space-x-3 mb-8">
              <Button
                variant="outline"
                onClick={isSaved ? handleUnsaveProduct : handleSaveProduct}
                disabled={savingStatus === 'saving'}
                className={isSaved ? "bg-green-50" : ""}
              >
                {savingStatus === 'saving' ? (
                  <span>Saving...</span>
                ) : (
                  <>
                    {isSaved ? (
                      <BookmarkCheck className="mr-2 h-4 w-4 text-green-600" />
                    ) : (
                      <Bookmark className="mr-2 h-4 w-4" />
                    )}
                    {isSaved ? "Saved" : "Save"}
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
            
            {product.platform_links && product.platform_links.length > 0 && (
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Where to buy</h3>
                <div className="space-y-2">
                  {product.platform_links.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      Buy online
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <Tabs defaultValue="nutrition" className="w-full mb-12">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="nutrition">Nutritional Info</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          </TabsList>
          <TabsContent value="nutrition" className="p-4 border rounded-md mt-2">
            {product.nutritional_info ? (
              <div>
                <h3 className="font-medium mb-4">Nutritional Information</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(product.nutritional_info).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="capitalize">{key.replace(/_/g, ' ')}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No nutritional information available</p>
            )}
          </TabsContent>
          <TabsContent value="ingredients" className="p-4 border rounded-md mt-2">
            {product.ingredients ? (
              <div>
                <h3 className="font-medium mb-4">Ingredients</h3>
                <p className="whitespace-pre-line">{product.ingredients}</p>
              </div>
            ) : (
              <p className="text-gray-500">No ingredients information available</p>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
} 