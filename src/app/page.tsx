import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Discover Healthy Food Alternatives
              </h1>
              <p className="mb-8 text-lg text-gray-600">
                A curated, trusted repository of healthy food and beverage products recommended by Fitin Club.
                Find better alternatives for your everyday dietary items.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="/signup"
                  className="rounded-md bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
                >
                  Get Started
                </Link>
                <Link
                  href="/search"
                  className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">Expert-Vetted</h3>
                <p className="text-gray-600">
                  All products are carefully reviewed and recommended by Fitin Club's health experts.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">Easy to Find</h3>
                <p className="text-gray-600">
                  Search and filter products by category, dietary needs, and meal type.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">Save & Share</h3>
                <p className="text-gray-600">
                  Create your personal list of favorite products and share with your Fitin coach.
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