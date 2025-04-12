'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import ProductCard from './product-card';
import { Product, Category, MealType } from '@/types';
import { Button } from '@/components/ui/button';

export default function ProductSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  
  // Search state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([]);
  const [selectedDietaryTags, setSelectedDietaryTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState('name-asc');
  
  // Results and metadata
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [mealTypes, setMealTypes] = useState<MealType[]>([]);
  const [dietaryTags, setDietaryTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Load filter options
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        // Load categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name');
          
        if (categoriesError) throw categoriesError;
        setCategories(categoriesData);
        
        // Load meal types
        const { data: mealTypesData, error: mealTypesError } = await supabase
          .from('meal_types')
          .select('*')
          .order('name');
          
        if (mealTypesError) throw mealTypesError;
        setMealTypes(mealTypesData);
        
        // Load unique dietary tags
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('dietary_tags')
          .eq('status', 'PUBLISHED');
          
        if (productsError) throw productsError;
        
        // Extract unique tags
        const allTags = productsData.flatMap(p => p.dietary_tags || []);
        const uniqueTags = [...new Set(allTags)].sort();
        setDietaryTags(uniqueTags);
      } catch (err) {
        console.error('Error loading filter options:', err);
        setError('Failed to load filter options. Please try again.');
      }
    };
    
    loadFilterOptions();
  }, []);
  
  // Load products when search/filters change
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Start building the query
        let query = supabase
          .from('products')
          .select(`
            *,
            category:categories(*),
            meal_types:product_meal_types(meal_type_id)
          `)
          .eq('status', 'PUBLISHED');
        
        // Apply search query
        if (searchQuery) {
          query = query.or(`name.ilike.%${searchQuery}%,brand_name.ilike.%${searchQuery}%`);
        }
        
        // Apply category filter
        if (selectedCategories.length > 0) {
          query = query.in('category_id', selectedCategories);
        }
        
        // Apply dietary tags filter
        if (selectedDietaryTags.length > 0) {
          // This assumes PostgreSQL array contains (@>) operator works with Supabase
          selectedDietaryTags.forEach(tag => {
            query = query.contains('dietary_tags', [tag]);
          });
        }
        
        // Apply sorting
        if (sortOrder === 'name-asc') {
          query = query.order('name', { ascending: true });
        } else if (sortOrder === 'name-desc') {
          query = query.order('name', { ascending: false });
        }
        
        const { data, error: productsError } = await query;
        
        if (productsError) throw productsError;
        
        // Filter by meal types (if selected) - this needs to be done client-side
        // since we're using a join table
        let filteredProducts = data || [];
        
        if (selectedMealTypes.length > 0 && filteredProducts.length > 0) {
          // Post-process to filter by meal types
          const { data: mealTypeRelations, error: mealTypeError } = await supabase
            .from('product_meal_types')
            .select('*')
            .in('meal_type_id', selectedMealTypes)
            .in('product_id', filteredProducts.map(p => p.id));
            
          if (mealTypeError) throw mealTypeError;
          
          const productIdsWithSelectedMealTypes = [...new Set(mealTypeRelations.map(r => r.product_id))];
          filteredProducts = filteredProducts.filter(p => productIdsWithSelectedMealTypes.includes(p.id));
        }
        
        setProducts(filteredProducts);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, [searchQuery, selectedCategories, selectedMealTypes, selectedDietaryTags, sortOrder]);
  
  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You might want to update the URL to make searches shareable
    // router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };
  
  // Toggle category filter
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  // Toggle meal type filter
  const toggleMealType = (mealTypeId: string) => {
    setSelectedMealTypes(prev => 
      prev.includes(mealTypeId)
        ? prev.filter(id => id !== mealTypeId)
        : [...prev, mealTypeId]
    );
  };
  
  // Toggle dietary tag filter
  const toggleDietaryTag = (tag: string) => {
    setSelectedDietaryTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };
  
  // Reset filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedMealTypes([]);
    setSelectedDietaryTags([]);
    setSortOrder('name-asc');
  };
  
  return (
    <div className="grid md:grid-cols-4 gap-6">
      {/* Filters Sidebar */}
      <div className="md:col-span-1 bg-white p-4 rounded-lg shadow">
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3">Search</h3>
          <form onSubmit={handleSearchSubmit} className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button type="submit" className="rounded-l-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Button>
          </form>
        </div>
        
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3">Categories</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {categories.map(category => (
              <label key={category.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => toggleCategory(category.id)}
                  className="rounded"
                />
                <span>{category.name}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3">Meal Types</h3>
          <div className="space-y-2">
            {mealTypes.map(mealType => (
              <label key={mealType.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedMealTypes.includes(mealType.id)}
                  onChange={() => toggleMealType(mealType.id)}
                  className="rounded"
                />
                <span>{mealType.name}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3">Dietary Preferences</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {dietaryTags.map(tag => (
              <label key={tag} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedDietaryTags.includes(tag)}
                  onChange={() => toggleDietaryTag(tag)}
                  className="rounded"
                />
                <span>{tag}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3">Sort By</h3>
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
          </select>
        </div>
        
        <Button 
          variant="outline" 
          onClick={resetFilters}
          className="w-full"
        >
          Reset All Filters
        </Button>
      </div>
      
      {/* Products Grid */}
      <div className="md:col-span-3">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md text-red-600 text-sm">
            {error}
          </div>
        ) : products.length === 0 ? (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button variant="outline" onClick={resetFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 