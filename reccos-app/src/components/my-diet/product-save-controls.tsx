'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface ProductSaveControlsProps {
  productId: string;
}

export default function ProductSaveControls({ productId }: ProductSaveControlsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleRemove = async () => {
    if (!confirm("Remove from My Diet? This product will be removed from your saved products list.")) {
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('user_saved_products')
        .delete()
        .eq('product_id', productId);

      if (error) {
        throw error;
      }
      
      router.refresh();
    } catch (error) {
      console.error('Error removing product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleRemove}
      disabled={isLoading}
      className="text-sm px-3 py-1 border border-red-200 text-red-600 bg-red-50 rounded-md hover:bg-red-100"
    >
      {isLoading ? 'Removing...' : 'Remove'}
    </button>
  );
} 