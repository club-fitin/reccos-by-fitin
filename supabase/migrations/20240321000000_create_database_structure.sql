-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create categories table
CREATE TABLE public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index for categories slug
CREATE INDEX categories_slug_idx ON public.categories (slug);

-- Create meal_types table
CREATE TABLE public.meal_types (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index for meal_types slug
CREATE INDEX meal_types_slug_idx ON public.meal_types (slug);

-- Create products table
CREATE TABLE public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_by UUID REFERENCES auth.users(id)
);

-- Create indexes for products
CREATE INDEX products_name_idx ON public.products (name);
CREATE INDEX products_slug_idx ON public.products (slug);
CREATE INDEX products_brand_name_idx ON public.products (brand_name);
CREATE INDEX products_category_id_idx ON public.products (category_id);
CREATE INDEX products_status_idx ON public.products (status);
CREATE INDEX products_dietary_tags_idx ON public.products USING GIN (dietary_tags);

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
    saved_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (user_id, product_id)
);

-- Create admins table
CREATE TABLE public.admins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON public.categories
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_meal_types_updated_at
    BEFORE UPDATE ON public.meal_types
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_meal_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_saved_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for categories
CREATE POLICY "Allow public read access to categories"
    ON public.categories
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Allow admin access to categories"
    ON public.categories
    FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'email' IN (SELECT email FROM public.admins));

-- Create RLS policies for meal_types
CREATE POLICY "Allow public read access to meal_types"
    ON public.meal_types
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Allow admin access to meal_types"
    ON public.meal_types
    FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'email' IN (SELECT email FROM public.admins));

-- Create RLS policies for products
CREATE POLICY "Allow public read access to published products"
    ON public.products
    FOR SELECT
    TO public
    USING (status = 'PUBLISHED');

CREATE POLICY "Allow authenticated users to read all products"
    ON public.products
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow admin access to products"
    ON public.products
    FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'email' IN (SELECT email FROM public.admins));

-- Create RLS policies for product_meal_types
CREATE POLICY "Allow public read access to product_meal_types"
    ON public.product_meal_types
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Allow admin access to product_meal_types"
    ON public.product_meal_types
    FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'email' IN (SELECT email FROM public.admins));

-- Create RLS policies for user_saved_products
CREATE POLICY "Allow users to manage their own saved products"
    ON public.user_saved_products
    FOR ALL
    TO authenticated
    USING (auth.uid() = user_id);

-- Create RLS policies for admins
CREATE POLICY "Allow admin access to admins table"
    ON public.admins
    FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'email' IN (SELECT email FROM public.admins));

-- Insert some sample data
INSERT INTO public.categories (name, description, slug)
VALUES
    ('Tea', 'Various types of healthy teas', 'tea'),
    ('Supplements', 'Dietary and nutritional supplements', 'supplements'),
    ('Snacks', 'Healthy snack options', 'snacks'),
    ('Beverages', 'Healthy drink alternatives', 'beverages');

INSERT INTO public.meal_types (name, slug)
VALUES
    ('Breakfast', 'breakfast'),
    ('Lunch', 'lunch'),
    ('Dinner', 'dinner'),
    ('Snack', 'snack'),
    ('All Day', 'all-day');

-- Insert sample products
INSERT INTO public.products (
    name,
    slug,
    brand_name,
    description,
    ingredients,
    image_url,
    category_id,
    nutritional_info,
    dietary_tags,
    platform_links,
    status
)
SELECT
    'Organic Green Tea',
    'organic-green-tea',
    'TeaTime',
    'Premium organic green tea leaves sourced from sustainable farms.',
    'Organic green tea leaves, Natural flavors',
    'https://example.com/green-tea.jpg',
    id,
    '{"serving_size": "1 cup", "calories": 0, "protein": 0, "carbs": 0, "fat": 0}',
    ARRAY['Organic', 'Antioxidant-rich', 'Caffeine-free'],
    '[{"name": "Amazon", "url": "https://amazon.com/tea"}, {"name": "Brand Store", "url": "https://teatime.com"}]',
    'PUBLISHED'
FROM public.categories WHERE name = 'Tea';

INSERT INTO public.products (
    name,
    slug,
    brand_name,
    description,
    ingredients,
    image_url,
    category_id,
    nutritional_info,
    dietary_tags,
    platform_links,
    status
)
SELECT
    'Plant-Based Protein Powder',
    'plant-based-protein-powder',
    'FitFuel',
    'High-quality plant-based protein powder with essential amino acids.',
    'Pea protein, Brown rice protein, Natural sweeteners',
    'https://example.com/protein-powder.jpg',
    id,
    '{"serving_size": "1 scoop (30g)", "calories": 120, "protein": 24, "carbs": 3, "fat": 2}',
    ARRAY['Vegan', 'High Protein', 'Gluten-Free'],
    '[{"name": "Amazon", "url": "https://amazon.com/protein"}, {"name": "Brand Store", "url": "https://fitfuel.com"}]',
    'PUBLISHED'
FROM public.categories WHERE name = 'Supplements';

-- Link products to meal types
INSERT INTO public.product_meal_types (product_id, meal_type_id)
SELECT 
    p.id,
    mt.id
FROM public.products p
CROSS JOIN public.meal_types mt
WHERE p.name = 'Organic Green Tea'
AND mt.name IN ('All Day', 'Breakfast');

INSERT INTO public.product_meal_types (product_id, meal_type_id)
SELECT 
    p.id,
    mt.id
FROM public.products p
CROSS JOIN public.meal_types mt
WHERE p.name = 'Plant-Based Protein Powder'
AND mt.name IN ('All Day', 'Breakfast', 'Snack'); 