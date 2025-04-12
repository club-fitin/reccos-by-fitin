-- Seed Categories
INSERT INTO public.categories (name, description, slug) VALUES
('Breakfast Foods', 'Healthy breakfast alternatives to start your day right', 'breakfast-foods'),
('Snacks', 'Nutritious options for between-meal cravings', 'snacks'),
('Beverages', 'Healthy drinks to keep you hydrated and nourished', 'beverages'),
('Baking', 'Better ingredients for your baking needs', 'baking'),
('Condiments', 'Healthier alternatives to everyday sauces and dressings', 'condiments'),
('Desserts', 'Guilt-free treats to satisfy your sweet tooth', 'desserts');

-- Seed Meal Types
INSERT INTO public.meal_types (name, slug) VALUES
('Breakfast', 'breakfast'),
('Lunch', 'lunch'),
('Dinner', 'dinner'),
('Snack', 'snack'),
('Dessert', 'dessert'),
('All Day', 'all-day'); 