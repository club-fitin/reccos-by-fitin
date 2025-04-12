'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useAuth } from '@/contexts/auth-context';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  
  // Function to toggle save product
  const toggleSaveProduct = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!user) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (isSaved) {
        // Remove from saved products
        const { error } = await supabase
          .from('user_saved_products')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', product.id);
          
        if (error) throw error;
        setIsSaved(false);
      } else {
        // Add to saved products
        const { error } = await supabase
          .from('user_saved_products')
          .insert({
            user_id: user.id,
            product_id: product.id,
          });
          
        if (error) throw error;
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error toggling product save:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Check if product is saved when user or product changes
  useEffect(() => {
    if (!user) return;
    
    const checkIfSaved = async () => {
      try {
        const { data, error } = await supabase
          .from('user_saved_products')
          .select('*')
          .eq('user_id', user.id)
          .eq('product_id', product.id)
          .maybeSingle();
          
        if (error) throw error;
        setIsSaved(!!data);
      } catch (error) {
        console.error('Error checking if product is saved:', error);
      }
    };
    
    checkIfSaved();
  }, [user, product.id, supabase]);
  
  const imageSrc = product.image_url || '/placeholder-product.jpg';
  const productTags = product.dietary_tags || [];
  
  return (
    <Link 
      href={`/products/${product.slug}`}
      className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="relative h-48 bg-gray-100">
        <Image 
          src={imageSrc}
          alt={product.name}
          fill
          className="transition-opacity opacity-0 duration-500 object-cover"
          onLoadingComplete={(image) => image.classList.remove("opacity-0")}
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg leading-tight">
            {product.name}
          </h3>
          
          <button
            onClick={toggleSaveProduct}
            disabled={isLoading}
            aria-label={isSaved ? "Remove from My Diet" : "Add to My Diet"}
            className="text-gray-400 hover:text-blue-600 focus:outline-none transition-colors"
          >
            {isSaved ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
          </button>
        </div>
        
        <p className="text-sm text-gray-500 mb-2">
          {product.brand_name}
        </p>
        
        {productTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {productTags.slice(0, 3).map((tag: string) => (
              <span 
                key={tag} 
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {productTags.length > 3 && (
              <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                +{productTags.length - 3} more
              </span>
            )}
          </div>
        )}
        
        <div className="text-sm flex items-center justify-between">
          <span className="text-blue-600">
            View Details
          </span>
          
          {product.category && (
            <span className="text-gray-500">
              {product.category.name}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
} 