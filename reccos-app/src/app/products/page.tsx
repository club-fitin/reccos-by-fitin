import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import ProductsGrid from '@/components/products-grid';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Product } from '@/components/product-card';

export const metadata = {
  title: 'Browse Products | Reccos by Fitin',
  description: 'Discover healthy food products vetted by nutrition experts'
};

async function getProducts(): Promise<Product[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  
  return data || [];
}

export default async function ProductsPage() {
  const products = await getProducts();
  
  return (
    <>
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Browse Products</h1>
            <p className="text-gray-600">
              Discover healthy food products recommended by nutrition experts.
            </p>
          </div>
          
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductsGrid products={products} showFilters={true} columns={3} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
} 