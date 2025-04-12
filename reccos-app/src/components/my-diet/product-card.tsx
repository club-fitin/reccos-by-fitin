'use client';

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand_name: string;
  description: string | null;
  ingredients: string | null;
  image_url: string | null;
  category_id: string;
  nutritional_info: Record<string, any> | null;
  dietary_tags: string[] | null;
  platform_links: string[] | null;
  status: 'DRAFT' | 'PUBLISHED';
  created_at: string;
  category: {
    id: string;
    name: string;
  } | null;
}

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  return (
    <div className="overflow-hidden h-full flex flex-col border rounded-lg">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image_url || '/placeholder-product.jpg'}
          alt={product.name}
          className="object-cover transition-transform hover:scale-105 w-full h-full"
        />
      </div>
      <div className="p-4 flex-1">
        <div className="mb-2">
          <p className="text-sm text-gray-500">{product.brand_name}</p>
          <a href={`/products/${product.slug}`} className="hover:underline">
            <h3 className="font-medium text-lg line-clamp-2">{product.name}</h3>
          </a>
        </div>
        {variant === 'default' && product.description && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-2">
            {product.description}
          </p>
        )}
        <div className="flex flex-wrap gap-1 mt-2">
          {product.dietary_tags && product.dietary_tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="border px-2 py-1 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 