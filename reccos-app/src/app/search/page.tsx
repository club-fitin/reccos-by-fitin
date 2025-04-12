'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

interface Product {
  id: string
  name: string
  brand_name: string
  image_url: string
  category_id: string
  dietary_tags: string[]
  description?: string
}

interface Category {
  id: string
  name: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [dietaryTags, setDietaryTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    fetchCategories()
    fetchDietaryTags()
    fetchProducts(initialQuery)
  }, [initialQuery])

  const fetchCategories = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('name')

      if (error) throw error
      setCategories(data || [])
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }

  const fetchDietaryTags = async () => {
    try {
      const supabase = createClient()
      // Get unique dietary tags from products
      const { data, error } = await supabase
        .from('products')
        .select('dietary_tags')
      
      if (error) throw error

      // Extract all dietary tags and deduplicate
      const allTags = data
        .filter(item => item.dietary_tags && item.dietary_tags.length > 0)
        .flatMap(item => item.dietary_tags)
      
      const uniqueTags = [...new Set(allTags)].sort()
      setDietaryTags(uniqueTags)
    } catch (err) {
      console.error('Error fetching dietary tags:', err)
    }
  }

  const fetchProducts = async (query: string) => {
    try {
      setLoading(true)
      const supabase = createClient()
      
      let productsQuery = supabase
        .from('products')
        .select('id, name, brand_name, image_url, category_id, dietary_tags, description')
        .eq('status', 'PUBLISHED')
      
      // Add search filtering if query exists
      if (query) {
        productsQuery = productsQuery.or(`name.ilike.%${query}%,description.ilike.%${query}%,brand_name.ilike.%${query}%`)
      }
      
      // Add category filtering
      if (selectedCategories.length > 0) {
        productsQuery = productsQuery.in('category_id', selectedCategories)
      }
      
      // Add dietary tags filtering
      if (selectedTags.length > 0) {
        // Filter products where ALL selected tags are present
        selectedTags.forEach(tag => {
          productsQuery = productsQuery.contains('dietary_tags', [tag])
        })
      }

      const { data, error } = await productsQuery.order('name')
      
      if (error) throw error
      setProducts(data)
    } catch (err) {
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Update URL with search query
    const params = new URLSearchParams(searchParams.toString())
    
    if (searchQuery) {
      params.set('q', searchQuery)
    } else {
      params.delete('q')
    }
    
    router.push(`/search?${params.toString()}`)
    fetchProducts(searchQuery)
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => {
      const newCategories = prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
      
      // Refresh results with updated filters
      setTimeout(() => fetchProducts(searchQuery), 0)
      return newCategories
    })
  }

  const handleTagChange = (tag: string) => {
    setSelectedTags(prev => {
      const newTags = prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
      
      // Refresh results with updated filters
      setTimeout(() => fetchProducts(searchQuery), 0)
      return newTags
    })
  }

  const resetFilters = () => {
    setSelectedCategories([])
    setSelectedTags([])
    fetchProducts(searchQuery)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Find Healthy Products</h1>
        
        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <Input
            type="text"
            placeholder="Search for products, brands, or ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">Search</Button>
        </form>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <div className="w-full md:w-64 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Filters</h2>
                {(selectedCategories.length > 0 || selectedTags.length > 0) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={resetFilters}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Clear All
                  </Button>
                )}
              </div>
              
              <div className="space-y-4">
                {/* Categories */}
                <div>
                  <h3 className="font-medium mb-2">Categories</h3>
                  <div className="space-y-1.5">
                    {categories.map(category => (
                      <div key={category.id} className="flex items-center">
                        <input 
                          type="checkbox"
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => handleCategoryChange(category.id)}
                          className="mr-2"
                        />
                        <label 
                          htmlFor={`category-${category.id}`}
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Dietary Tags */}
                <div>
                  <h3 className="font-medium mb-2">Dietary Preferences</h3>
                  <div className="space-y-1.5">
                    {dietaryTags.map(tag => (
                      <div key={tag} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`tag-${tag}`}
                          checked={selectedTags.includes(tag)}
                          onChange={() => handleTagChange(tag)}
                          className="mr-2"
                        />
                        <label 
                          htmlFor={`tag-${tag}`}
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          {tag}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="rounded-lg border shadow overflow-hidden">
                    <div className="h-40 bg-gray-200 animate-pulse"></div>
                    <div className="p-4">
                      <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3 mb-4"></div>
                      <div className="flex gap-2 mb-4">
                        <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">No products found</h2>
                <p className="text-gray-600 mb-8">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                {(selectedCategories.length > 0 || selectedTags.length > 0) && (
                  <Button onClick={resetFilters}>Clear Filters</Button>
                )}
              </div>
            ) : (
              <div>
                <p className="mb-4 text-gray-600">{products.length} product{products.length !== 1 ? 's' : ''} found</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="rounded-lg border shadow overflow-hidden hover:shadow-md transition-shadow">
                      <Link href={`/products/${product.id}`}>
                        <div className="h-40 relative">
                          {product.image_url ? (
                            <img 
                              src={product.image_url} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500">No image</span>
                            </div>
                          )}
                        </div>
                      </Link>
                      <div className="p-4">
                        <Link href={`/products/${product.id}`}>
                          <h2 className="text-lg font-semibold mb-1 hover:text-blue-600">{product.name}</h2>
                        </Link>
                        <p className="text-gray-600 text-sm mb-3">{product.brand_name}</p>
                        
                        {product.description && (
                          <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                            {product.description}
                          </p>
                        )}
                        
                        {product.dietary_tags && product.dietary_tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {product.dietary_tags.slice(0, 3).map((tag, index) => (
                              <span 
                                key={index}
                                className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                            {product.dietary_tags.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                +{product.dietary_tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                        
                        <Button asChild variant="outline" size="sm" className="w-full">
                          <Link href={`/products/${product.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 