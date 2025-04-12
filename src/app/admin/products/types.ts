export interface Product {
  id: string
  name: string
  slug: string
  brand_name: string
  description: string
  ingredients: string
  image_url: string
  category_id: string
  nutritional_info: Record<string, any>
  dietary_tags: string[]
  platform_links: string[]
  status: 'DRAFT' | 'PUBLISHED'
  created_at: string
} 