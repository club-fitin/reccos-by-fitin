import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface Product {
  id: string;
  name: string;
  brand_name: string;
  description?: string;
  image_url?: string;
  categories?: string[];
  is_vegetarian?: boolean;
  is_vegan?: boolean;
  is_glutenfree?: boolean;
  is_organic?: boolean;
  is_dairyfree?: boolean;
}

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
}

export default function ProductCard({ product, showActions = true }: ProductCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      
      <CardContent className="flex-grow pt-4">
        <div className="text-sm text-gray-500 mb-1">{product.brand_name}</div>
        <h3 className="font-semibold text-lg line-clamp-2 mb-2">{product.name}</h3>
        {product.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
        )}
        
        <div className="flex flex-wrap gap-1 mt-2">
          {product.is_vegetarian && <Badge variant="outline" className="bg-green-50">Vegetarian</Badge>}
          {product.is_vegan && <Badge variant="outline" className="bg-green-50">Vegan</Badge>}
          {product.is_glutenfree && <Badge variant="outline" className="bg-yellow-50">Gluten-Free</Badge>}
          {product.is_organic && <Badge variant="outline" className="bg-amber-50">Organic</Badge>}
          {product.is_dairyfree && <Badge variant="outline" className="bg-blue-50">Dairy-Free</Badge>}
        </div>
      </CardContent>
      
      {showActions && (
        <CardFooter className="pt-0">
          <Link href={`/products/${product.id}`} className="text-sm font-medium text-primary hover:underline">
            View Details
          </Link>
        </CardFooter>
      )}
    </Card>
  );
} 