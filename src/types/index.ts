export interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface MealType {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand_name: string;
  description?: string;
  ingredients?: string;
  image_url?: string;
  category_id: string;
  nutritional_info?: {
    serving_size?: string;
    calories?: number;
    protein?: number;
    carbs?: number;
    net_carbs?: number;
    fat?: number;
    saturated_fat?: number;
    sugar?: number;
    fiber?: number;
  };
  dietary_tags?: string[];
  platform_links?: Array<{
    name: string;
    url: string;
  }>;
  status: 'DRAFT' | 'PUBLISHED';
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  phone_number?: string;
  role: 'MEMBER' | 'ADMIN';
  created_at: string;
  updated_at: string;
}

export interface SavedProduct {
  user_id: string;
  product_id: string;
  saved_at: string;
}

export interface ProductMealType {
  product_id: string;
  meal_type_id: string;
} 