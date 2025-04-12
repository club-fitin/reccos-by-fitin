'use client';

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  category: string;
  tags: string[];
  image_url: string;
  dietitian_approved: boolean;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="overflow-hidden h-full flex flex-col border rounded-lg">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image_url || '/placeholder-product.jpg'}
          alt={product.name}
          className="object-cover transition-transform hover:scale-105 w-full h-full"
        />
        {product.dietitian_approved && (
          <span className="absolute top-2 right-2 bg-green-100 text-green-800 hover:bg-green-200 px-2 py-1 rounded-full text-xs font-medium">
            Dietitian Approved
          </span>
        )}
      </div>
      <div className="p-4 flex-1">
        <div className="mb-2">
          <p className="text-sm text-gray-500">{product.brand}</p>
          <a href={`/products/${product.id}`} className="hover:underline">
            <h3 className="font-medium text-lg line-clamp-2">{product.name}</h3>
          </a>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2 mb-2">
          {product.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-2">
          {product.tags && product.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="border px-2 py-1 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4 pt-0 flex justify-between items-center">
        <button
          onClick={() => {
            // Placeholder for save functionality
            console.log(`Save product: ${product.id}`);
          }}
          className="text-sm px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Save
        </button>
      </div>
    </div>
  );
} 