-- Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_categories_slug ON public.categories(slug);

-- Create meal_types table
CREATE TABLE public.meal_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_meal_types_slug ON public.meal_types(slug);

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  brand_name TEXT NOT NULL,
  description TEXT,
  ingredients TEXT,
  image_url TEXT,
  category_id UUID NOT NULL REFERENCES public.categories(id),
  nutritional_info JSONB DEFAULT '{}',
  dietary_tags TEXT[] DEFAULT '{}',
  platform_links JSONB DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_products_name ON public.products(name);
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_brand_name ON public.products(brand_name);
CREATE INDEX idx_products_category_id ON public.products(category_id);
CREATE INDEX idx_products_dietary_tags ON public.products USING GIN(dietary_tags);
CREATE INDEX idx_products_status ON public.products(status);

-- Create product_meal_types join table
CREATE TABLE public.product_meal_types (
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  meal_type_id UUID NOT NULL REFERENCES public.meal_types(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, meal_type_id)
);

-- Create user_saved_products table (My Diet)
CREATE TABLE public.user_saved_products (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, product_id)
);

-- Create RLS policies
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_meal_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_saved_products ENABLE ROW LEVEL SECURITY;

-- Create policies for read access
CREATE POLICY "Allow read access for all users" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON public.meal_types FOR SELECT USING (true);
CREATE POLICY "Allow read access for published products" ON public.products FOR SELECT USING (status = 'PUBLISHED' OR auth.uid() = created_by);
CREATE POLICY "Allow read access for all users" ON public.product_meal_types FOR SELECT USING (true);
CREATE POLICY "Allow users to read their own saved products" ON public.user_saved_products FOR SELECT USING (auth.uid() = user_id);

-- Create policies for write access
CREATE POLICY "Allow admin to create categories" ON public.categories FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'ADMIN')
);
CREATE POLICY "Allow admin to update categories" ON public.categories FOR UPDATE USING (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'ADMIN')
);
CREATE POLICY "Allow admin to delete categories" ON public.categories FOR DELETE USING (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'ADMIN')
);

CREATE POLICY "Allow admin to create meal types" ON public.meal_types FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'ADMIN')
);
CREATE POLICY "Allow admin to update meal types" ON public.meal_types FOR UPDATE USING (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'ADMIN')
);
CREATE POLICY "Allow admin to delete meal types" ON public.meal_types FOR DELETE USING (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'ADMIN')
);

CREATE POLICY "Allow admin to create products" ON public.products FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'ADMIN')
);
CREATE POLICY "Allow admin to update products" ON public.products FOR UPDATE USING (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'ADMIN')
);
CREATE POLICY "Allow admin to delete products" ON public.products FOR DELETE USING (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'ADMIN')
);

CREATE POLICY "Allow admin to manage product meal types" ON public.product_meal_types FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'ADMIN')
);
CREATE POLICY "Allow admin to update product meal types" ON public.product_meal_types FOR UPDATE USING (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'ADMIN')
);
CREATE POLICY "Allow admin to delete product meal types" ON public.product_meal_types FOR DELETE USING (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'ADMIN')
);

CREATE POLICY "Allow users to save products" ON public.user_saved_products FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow users to delete their saved products" ON public.user_saved_products FOR DELETE USING (auth.uid() = user_id);

-- Create functions to maintain updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_meal_types_updated_at BEFORE UPDATE ON public.meal_types
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column(); 