export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          slug?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      meal_types: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      product_meal_types: {
        Row: {
          product_id: string
          meal_type_id: string
        }
        Insert: {
          product_id: string
          meal_type_id: string
        }
        Update: {
          product_id?: string
          meal_type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_meal_types_meal_type_id_fkey"
            columns: ["meal_type_id"]
            isOneToOne: false
            referencedRelation: "meal_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_meal_types_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
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
        Insert: {
          id?: string
          name: string
          slug: string
          brand_name: string
          description?: string | null
          ingredients?: string | null
          image_url?: string | null
          category_id: string
          nutritional_info?: Json
          dietary_tags?: string[]
          platform_links?: Json
          status?: string
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          brand_name?: string
          description?: string | null
          ingredients?: string | null
          image_url?: string | null
          category_id?: string
          nutritional_info?: Json
          dietary_tags?: string[]
          platform_links?: Json
          status?: string
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_saved_products: {
        Row: {
          user_id: string
          product_id: string
          saved_at: string
        }
        Insert: {
          user_id: string
          product_id: string
          saved_at?: string
        }
        Update: {
          user_id?: string
          product_id?: string
          saved_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_saved_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_saved_products_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
        }
        Insert: {
          id: string
          email: string
          role?: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 