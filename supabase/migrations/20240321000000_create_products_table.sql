-- Create products table
CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5),
    expert_review TEXT NOT NULL,
    ingredients TEXT[] NOT NULL,
    benefits TEXT[] NOT NULL,
    usage_instructions TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index for faster text search
CREATE INDEX products_search_idx ON products USING GIN (
    to_tsvector('english', name || ' ' || description || ' ' || category)
);

-- Create index for category filtering
CREATE INDEX products_category_idx ON products (category);

-- Create index for rating sorting
CREATE INDEX products_rating_idx ON products (rating DESC);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all authenticated users to read products
CREATE POLICY "Allow authenticated users to read products"
    ON products
    FOR SELECT
    TO authenticated
    USING (true);

-- Create policy to allow only admins to insert/update/delete products
CREATE POLICY "Allow only admins to modify products"
    ON products
    FOR ALL
    TO authenticated
    USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'email' IN (
        SELECT email FROM admins
    ));

-- Create admins table to store admin users
CREATE TABLE admins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert some sample categories
INSERT INTO products (name, description, category, image_url, rating, expert_review, ingredients, benefits, usage_instructions)
VALUES
    (
        'Organic Green Tea',
        'Premium organic green tea leaves sourced from sustainable farms.',
        'Tea',
        'https://example.com/green-tea.jpg',
        4.5,
        'This organic green tea is rich in antioxidants and provides a smooth, refreshing taste. The leaves are carefully selected and processed to maintain their natural benefits.',
        ARRAY['Organic green tea leaves', 'Natural flavors'],
        ARRAY['Rich in antioxidants', 'Boosts metabolism', 'Supports heart health'],
        'Steep 1 teaspoon in 8oz of hot water for 2-3 minutes. Enjoy hot or cold.'
    ),
    (
        'Protein Powder',
        'High-quality plant-based protein powder with essential amino acids.',
        'Supplements',
        'https://example.com/protein-powder.jpg',
        4.8,
        'This plant-based protein powder provides a complete amino acid profile and is easily digestible. It''s an excellent choice for post-workout recovery.',
        ARRAY['Pea protein', 'Brown rice protein', 'Natural sweeteners'],
        ARRAY['Supports muscle recovery', 'Promotes satiety', 'Easy to digest'],
        'Mix 1 scoop with 8-12oz of water or your favorite beverage. Shake well and consume.'
    ); 