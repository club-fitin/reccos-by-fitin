'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Heart, Share2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Product {
  id: string;
  name: string;
  brand_name: string;
  description: string;
  image_url: string | null;
  category_id: string;
  dietary_tags: string[] | null;
}

interface ProductCardProps {
  product: Product;
  isSaved?: boolean;
  onSaveChange?: (saved: boolean) => void;
}

export default function ProductCard({ product, isSaved: initialIsSaved = false, onSaveChange }: ProductCardProps) {
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('saved_products')
        .insert({
          product_id: product.id
        });

      if (error) throw error;
      setIsSaved(true);
      onSaveChange?.(true);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to save product',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUnsave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('saved_products')
        .delete()
        .eq('product_id', product.id);

      if (error) throw error;
      setIsSaved(false);
      onSaveChange?.(false);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to unsave product',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const imageSrc = product.image_url || '/placeholder-product.jpg';
  const productTags = product.dietary_tags || [];

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="aspect-square relative">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.brand_name}</p>
        <p className="text-sm mt-2 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={isSaved ? handleUnsave : handleSave}
            disabled={loading}
          >
            <Heart className="w-4 h-4 mr-2" />
            {isSaved ? 'Saved' : 'Save'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/products/${product.id}`)}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
} 