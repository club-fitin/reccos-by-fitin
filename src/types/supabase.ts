export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
          updated_at: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          brand_name: string
          description: string | null
          ingredients: string | null
          image_url: string | null
          category_id: string
          nutritional_info: Json
          dietary_tags: string[]
          platform_links: Json
          status: string
          created_at: string
          updated_at: string
          created_by: string | null
        }
      }
      meal_types: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
          updated_at: string
        }
      }
      user_saved_products: {
        Row: {
          id: string
          user_id: string
          product_id: string
          created_at: string
        }
      }
    }
  }
  auth: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: string
          created_at: string
          updated_at: string
        }
      }
    }
  }
} 