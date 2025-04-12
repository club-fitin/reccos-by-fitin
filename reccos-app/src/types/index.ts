import { Database } from './supabase';

export type User = Database['auth']['Tables']['users']['Row'];

export type UserRole = 'MEMBER' | 'ADMIN';

export type Category = Database['public']['Tables']['categories']['Row'];
export type MealType = Database['public']['Tables']['meal_types']['Row'];

export type Product = Database['public']['Tables']['products']['Row'] & {
  category?: Category;
  meal_types?: MealType[];
};

export type SavedProduct = Database['public']['Tables']['user_saved_products']['Row'] & {
  product?: Product;
};

export type NutritionalInfo = {
  serving_size?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  net_carbs?: number;
  fat?: number;
  saturated_fat?: number;
  sugar?: number;
  fiber?: number;
  [key: string]: any;
};

export type PlatformLink = {
  name: string;
  url: string;
}; 