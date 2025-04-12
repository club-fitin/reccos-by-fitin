'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Bookmark, BookmarkCheck } from 'lucide-react';

interface ProductSaveControlsProps {
  productId: string;
  variant?: 'default' | 'compact';
}

export default function ProductSaveControls({ productId, variant = 'default' }: ProductSaveControlsProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const [savingStatus, setSavingStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const handleSaveProduct = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    try {
      setSavingStatus('saving');
      
      if (isSaved) {
        const response = await supabase
          .from('saved_products')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId);

        if (response.error) throw response.error;
        
        setIsSaved(false);
        setSavingStatus('success');
        toast({
          title: 'Product removed',
          description: 'Product has been removed from your diet',
        });
      } else {
        const response = await supabase
          .from('saved_products')
          .insert({
            user_id: user.id,
            product_id: productId,
          });

        if (response.error) throw response.error;
        
        setIsSaved(true);
        setSavingStatus('success');
        toast({
          title: 'Product saved',
          description: 'Product has been added to your diet',
        });
      }
    } catch (err) {
      console.error('Error saving/unsaving product:', err);
      setSavingStatus('error');
      toast({
        title: 'Error',
        description: 'Failed to update product. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setTimeout(() => setSavingStatus('idle'), 2000);
    }
  };

  return (
    <Button
      variant="outline"
      size={variant === 'compact' ? 'sm' : 'default'}
      onClick={handleSaveProduct}
      disabled={savingStatus === 'saving'}
      className={isSaved ? 'bg-green-50' : ''}
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
          {variant === 'default' ? (isSaved ? 'Saved' : 'Save') : null}
        </>
      )}
    </Button>
  );
} 