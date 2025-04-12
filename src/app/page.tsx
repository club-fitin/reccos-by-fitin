'use client';

import * as React from 'react';
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Healthy Food Alternatives
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Expert-vetted recommendations for healthier eating choices
            </p>
            <div className="space-x-4">
              <a
                href="/signup"
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
              >
                Get Started
              </a>
              <a
                href="/products"
                className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600"
              >
                Browse Products
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Expert-Vetted</h3>
                <p className="text-gray-600">
                  All recommendations are carefully reviewed by nutrition experts
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Easy to Find</h3>
                <p className="text-gray-600">
                  Quickly discover healthier alternatives to your favorite foods
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Save & Share</h3>
                <p className="text-gray-600">
                  Build your personal diet plan and share with friends
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 