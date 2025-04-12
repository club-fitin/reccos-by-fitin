'use client';

import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#181818] text-white">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-image.jpg"
              alt="Healthy food alternatives"
              fill
              className="object-cover opacity-40"
              priority
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Find Healthier Food Alternatives
              </h1>
              <p className="text-xl md:text-2xl mb-10 opacity-90">
                Expert-vetted recommendations for better everyday choices
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/signup"
                  className="bg-[#FF5757] hover:bg-[#ff3c3c] text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors"
                >
                  Get Started
                </a>
                <a
                  href="/products"
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-[#181818] px-8 py-4 rounded-lg font-medium text-lg transition-colors"
                >
                  Explore Products
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-[#121212]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="flex flex-col items-center text-center">
                <div className="mb-8 relative w-64 h-64">
                  <Image
                    src="/Search & Discover.png"
                    alt="Search & Discover"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4">Search & Discover</h3>
                <p className="text-gray-300">
                  Find healthier alternatives to your favorite foods with our powerful search and filtering
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-8 relative w-64 h-64">
                  <Image
                    src="/Save Your Favorites.png"
                    alt="Save Your Favorites"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4">Save Your Favorites</h3>
                <p className="text-gray-300">
                  Create your personal diet collection with products you love
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-8 relative w-64 h-64">
                  <Image
                    src="/Get Expert Advice.png"
                    alt="Get Expert Advice"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4">Get Expert Advice</h3>
                <p className="text-gray-300">
                  Connect with Fitin coaches for personalized nutrition guidance
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Popular Categories</h2>
            <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
              Explore our curated collection of healthier alternatives across these categories
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Breakfast', image: '/category-Breakfast.jpg' },
                { name: 'Snacks & Munchies', image: '/category-Snacks & Munchies.jpg' },
                { name: 'Beverages', image: '/category-Beverages.jpg' },
                { name: 'Condiments & Sauces', image: '/category-Condiments & Sauces.jpg' },
                { name: 'Cooking Essentials', image: '/category-Cooking Essentials.jpg' },
                { name: 'Desserts & Treats', image: '/category-Desserts & Treats.jpg' },
              ].map((category, index) => (
                <a key={index} href={`/products?category=${category.name}`} className="group">
                  <div className="relative h-64 rounded-xl overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <h3 className="text-2xl font-bold p-6">{category.name}</h3>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Fitin Ecosystem */}
        <section className="py-24 bg-[#121212]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="relative rounded-xl overflow-hidden h-[400px]">
                  <Image
                    src="/fitin-ecosystem.jpg"
                    alt="Fitin Ecosystem"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Part of the Fitin Ecosystem</h2>
                <p className="text-xl text-gray-300 mb-8">
                  Reccos by Fitin is an integral part of the Fitin Club ecosystem, designed to complement our personalized coaching services with practical product recommendations.
                </p>
                <a
                  href="https://fitin.club"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FF5757] hover:bg-[#ff3c3c] text-white px-8 py-4 rounded-lg font-medium text-lg inline-block transition-colors"
                >
                  Visit Fitin Club
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* App Screenshot */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Your Personalized Diet Guide</h2>
            <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
              Save your favorite healthy products and get personalized recommendations from our expert coaches
            </p>
            
            <div className="relative rounded-xl overflow-hidden mx-auto max-w-5xl">
              <Image
                src="/dashboard-screenshot.jpg"
                alt="Reccos Dashboard"
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-[#FF5757]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to Discover Healthier Options?</h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto">
              Join thousands of health-conscious individuals finding better everyday choices with Reccos by Fitin
            </p>
            <a
              href="/signup"
              className="bg-white text-[#FF5757] hover:bg-gray-100 px-8 py-4 rounded-lg font-medium text-lg inline-block transition-colors"
            >
              Create Your Account
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 