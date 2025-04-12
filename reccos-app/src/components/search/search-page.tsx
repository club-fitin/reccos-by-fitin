'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import ProductCard, { Product } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface SearchPageProps {
  initialQuery?: string;
}

export default function SearchPage({ initialQuery = '' }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDietaryTags, setSelectedDietaryTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dietaryTags, setDietaryTags] = useState<string[]>([]);
  
  // Load categories once on component mount
  useEffect(() => {
    const loadCategories = async () => {
      const { data } = await supabase
        .from('categories')
        .select('id, name, slug')
        .order('name', { ascending: true });
      
      if (data) {
        setCategories(data as Category[]);
      }
    };
    
    loadCategories();
  }, []);
  
  // Load distinct dietary tags once
  useEffect(() => {
    const loadDietaryTags = async () => {
      const { data } = await supabase
        .from('products')
        .select('dietary_tags')
        .eq('status', 'PUBLISHED');
      
      if (data) {
        const allTags = (data as { dietary_tags: string[] }[])
          .flatMap(product => product.dietary_tags || [])
          .filter(Boolean);
        const uniqueTags = [...new Set(allTags)];
        setDietaryTags(uniqueTags);
      }
    };
    
    loadDietaryTags();
  }, [supabase]);
  
  // Perform search when query, categories, or dietary tags change
  useEffect(() => {
    const performSearch = async () => {
      setIsLoading(true);
      
      try {
        let query = supabase
          .from('products')
          .select(`
            id, 
            name, 
            slug, 
            brand_name, 
            description,
            image_url,
            dietary_tags,
            is_vegetarian,
            is_vegan,
            is_glutenfree,
            is_organic,
            is_dairyfree
          `)
          .eq('status', 'PUBLISHED');
        
        // Add text search if query is provided
        if (searchQuery) {
          query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,brand_name.ilike.%${searchQuery}%`);
        }
        
        // Filter by selected categories
        if (selectedCategories.length > 0) {
          query = query.in('category_id', selectedCategories);
        }
        
        // Filter by dietary tags (any product that has at least one of the selected tags)
        if (selectedDietaryTags.length > 0) {
          // This assumes dietary_tags is a PostgreSQL array column
          selectedDietaryTags.forEach(tag => {
            query = query.contains('dietary_tags', [tag]);
          });
        }
        
        const { data } = await query.order('name', { ascending: true });
        setProducts((data || []) as Product[]);
      } catch (error) {
        console.error('Error searching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    performSearch();
  }, [searchQuery, selectedCategories, selectedDietaryTags, supabase]);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already triggered by useEffect dependency array
  };
  
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  const toggleDietaryTag = (tag: string) => {
    setSelectedDietaryTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };
  
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedDietaryTags([]);
    setSearchQuery('');
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Filters sidebar */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium text-lg mb-4">Filters</h3>
          
          <div className="mb-6">
            <h4 className="font-medium mb-2">Categories</h4>
            <div className="space-y-2">
              {categories.map(category => (
                <div key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                    className="mr-2"
                  />
                  <label htmlFor={`category-${category.id}`} className="text-sm">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium mb-2">Dietary Preferences</h4>
            <div className="flex flex-wrap gap-2">
              {dietaryTags.map(tag => (
                <Badge 
                  key={tag}
                  variant={selectedDietaryTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleDietaryTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          {(selectedCategories.length > 0 || selectedDietaryTags.length > 0) && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
              className="w-full"
            >
              Reset Filters
            </Button>
          )}
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-grow">
        <form onSubmit={handleSearchSubmit} className="mb-6">
          <div className="flex gap-2">
            <Input
              type="search"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">
              Search
            </Button>
          </div>
        </form>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button variant="outline" onClick={resetFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 