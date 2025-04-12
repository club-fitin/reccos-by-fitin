'use client'

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import ProductCard, { Product } from "@/components/product-card";

interface ProductsGridProps {
  products: Product[];
  columns?: number;
  showFilters?: boolean;
}

interface FilterButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, active, onClick }) => {
  return (
    <Badge
      variant={active ? "default" : "outline"}
      className="cursor-pointer px-3 py-1"
      onClick={onClick}
    >
      {label}
    </Badge>
  );
};

const ProductsGrid: React.FC<ProductsGridProps> = ({
  products,
  columns = 3,
  showFilters = true,
}) => {
  const [filters, setFilters] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    organic: false,
    dairyFree: false,
  });

  const toggleFilter = (filter: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const filteredProducts = products.filter((product) => {
    if (
      (filters.vegetarian && !product.is_vegetarian) ||
      (filters.vegan && !product.is_vegan) ||
      (filters.glutenFree && !product.is_glutenfree) ||
      (filters.organic && !product.is_organic) ||
      (filters.dairyFree && !product.is_dairyfree)
    ) {
      return false;
    }
    return true;
  });

  const gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;

  return (
    <div className="space-y-6">
      {showFilters && (
        <div className="flex flex-wrap gap-2">
          <FilterButton
            label="Vegetarian"
            active={filters.vegetarian}
            onClick={() => toggleFilter("vegetarian")}
          />
          <FilterButton
            label="Vegan"
            active={filters.vegan}
            onClick={() => toggleFilter("vegan")}
          />
          <FilterButton
            label="Gluten Free"
            active={filters.glutenFree}
            onClick={() => toggleFilter("glutenFree")}
          />
          <FilterButton
            label="Organic"
            active={filters.organic}
            onClick={() => toggleFilter("organic")}
          />
          <FilterButton
            label="Dairy Free"
            active={filters.dairyFree}
            onClick={() => toggleFilter("dairyFree")}
          />
        </div>
      )}

      <div
        className="grid gap-4"
        style={{ gridTemplateColumns }}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No products found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsGrid; 