'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';

interface AddToDietButtonProps {
  productId: string;
}

export default function AddToDietButton({ productId }: AddToDietButtonProps) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  
  // Check if product is already saved
  useEffect(() => {
    if (!user) return;
    
    const checkIfSaved = async () => {
      try {
        const { data, error } = await supabase
          .from('user_saved_products')
          .select('*')
          .eq('user_id', user.id)
          .eq('product_id', productId)
          .maybeSingle();
          
        if (error) throw error;
        setIsSaved(!!data);
      } catch (error) {
        console.error('Error checking if product is saved:', error);
      }
    };
    
    checkIfSaved();
  }, [user, productId, supabase]);
  
  const handleClick = async () => {
    if (!user) {
      router.push('/login');
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
          .eq('product_id', productId);
          
        if (error) throw error;
        setIsSaved(false);
      } else {
        // Add to saved products
        const { error } = await supabase
          .from('user_saved_products')
          .insert({
            user_id: user.id,
            product_id: productId,
          });
          
        if (error) throw error;
        setIsSaved(true);
      }
      
      router.refresh();
    } catch (error) {
      console.error('Error toggling product save:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      variant={isSaved ? "default" : "outline"}
      className="flex items-center gap-2 min-w-[120px]"
    >
      {isSaved ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          Saved
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Add to Diet
        </>
      )}
    </Button>
  );
} 