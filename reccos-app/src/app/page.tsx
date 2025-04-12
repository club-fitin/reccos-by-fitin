import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SearchPage from '@/components/search/search-page';

export const metadata: Metadata = {
  title: 'Reccos by Fitin - Discover Healthy Food Alternatives',
  description: 'Find the best healthy food alternatives recommended by experts at Fitin Club.',
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#181818] text-[#f5f1dd]">
      {/* Navbar */}
      <nav className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <div className="w-[104px] h-[85px] relative">
            <Image 
              src="/logo.png" 
              alt="Reccos by Fitin" 
              fill 
              className="object-contain"
            />
          </div>
          
          <div className="flex items-center space-x-8">
            <Link href="/" className="font-medium hover:text-white">Home</Link>
            <Link href="/about" className="font-medium hover:text-white">About</Link>
            <Link href="/contact" className="font-medium hover:text-white">Contact</Link>
          </div>
          
          <Link 
            href="/login" 
            className="border border-[#f5f1dd] rounded-full px-8 py-3 font-medium hover:bg-[#f5f1dd] hover:text-[#181818] transition-colors"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-[#181818] py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl font-bold mb-8">
              Discover Healthier Alternatives to Your Everyday Foods
            </h1>
            <p className="text-xl mb-12">
              Expert-vetted recommendations to improve your diet without compromise.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
              <Link 
                href="/signup" 
                className="bg-[#536e3e] hover:bg-[#445a33] text-[#f5f1dd] px-10 py-4 rounded-full font-medium transition-colors"
              >
                Try For Free
              </Link>
              <Link 
                href="#search" 
                className="border border-[#f5f1dd] text-[#f5f1dd] hover:bg-[#f5f1dd] hover:text-[#181818] px-10 py-4 rounded-full font-medium transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
          
          {/* Hero Images */}
          <div className="relative h-[500px] mt-12">
            <div className="absolute transform rotate-12 top-20 left-1/4 shadow-lg rounded-md overflow-hidden">
              <Image src="/hero-image-1.jpg" alt="App screenshot" width={466} height={429} />
            </div>
            <div className="absolute transform -rotate-12 top-20 right-1/4 shadow-lg rounded-md overflow-hidden">
              <Image src="/hero-image-2.jpg" alt="App screenshot" width={466} height={451} />
            </div>
            <div className="absolute transform -rotate-6 top-24 left-1/3 shadow-lg rounded-md overflow-hidden">
              <Image src="/hero-image-3.jpg" alt="App screenshot" width={466} height={429} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#181818]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">FEATURES</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Food marketing can be misleading. Products labeled 'healthy,' 'natural,' or 'low-fat' often hide unhealthy ingredients. At Reccos by Fitin, we cut through the confusion by providing transparent, trustworthy alternatives to your everyday food items.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <Image 
                src="/dashboard-screenshot.jpg" 
                alt="Reccos dashboard" 
                width={752} 
                height={659} 
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="lg:w-1/3 space-y-10">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[#fd9327] text-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.1 13.34L3.91 9.16C2.35 7.59 2.35 5.06 3.91 3.5C5.47 1.94 8 1.94 9.56 3.5L13.75 7.68L8.1 13.34M13.89 3.77L11.28 6.38L12.69 7.79L15.3 5.18L13.89 3.77M15.3 8.39L12.69 6.78L8.1 11.36L9.96 13.23L15.3 8.39M3 19.96V22H6.04L16.15 11.89L13.11 8.85L3 19.96Z"/>
                    </svg>
                  </span>
                  <h3 className="text-xl font-bold">A single source of truth</h3>
                </div>
                <p className="text-gray-300">
                  When you add work to your Slate calendar we automatically calculate useful insights
                </p>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[#fd9327] text-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                    </svg>
                  </span>
                  <h3 className="text-xl font-bold">Intuitive interface</h3>
                </div>
                <p className="text-gray-300">
                  When you add work to your Slate calendar we automatically calculate useful insights
                </p>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[#c99027] text-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.26 3C8.17 2.86 4 6.95 4 12H2.21C1.76 12 1.54 12.54 1.86 12.85L4.65 15.65C4.85 15.85 5.16 15.85 5.36 15.65L8.15 12.85C8.46 12.54 8.24 12 7.79 12H6C6 8.1 9.18 4.95 13.1 5C16.82 5.05 19.95 8.18 20 11.9C20.05 15.81 16.9 19 13 19C11.39 19 9.9 18.45 8.72 17.52C8.32 17.2 7.76 17.24 7.4 17.6C6.98 18.02 7.01 18.73 7.48 19.09C9 20.29 10.91 21 13 21C18.05 21 22.14 16.88 22 11.79C21.87 7.01 17.99 3.13 13.26 3M15 11.75V8H13V12.25L16.2 14.15L17.2 12.5L15 11.75Z" />
                    </svg>
                  </span>
                  <h3 className="text-xl font-bold">Or with rules</h3>
                </div>
                <p className="text-gray-300">
                  When you add work to your Slate calendar we automatically calculate useful insights
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-[#181818]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="rounded-xl overflow-hidden shadow-lg bg-white">
              <div className="h-[285px] overflow-hidden">
                <Image src="/category-breakfast.jpg" alt="Breakfast" width={225} height={285} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-[#181818]">Breakfast</h3>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-lg bg-white">
              <div className="h-[285px] overflow-hidden">
                <Image src="/category-snacks.jpg" alt="Snacks & Munchies" width={225} height={285} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-[#181818]">Snacks & Munchies</h3>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-lg bg-white">
              <div className="h-[285px] overflow-hidden">
                <Image src="/category-cooking.jpg" alt="Cooking Essentials" width={225} height={285} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-[#181818]">Cooking Essentials</h3>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-lg bg-white">
              <div className="h-[285px] overflow-hidden">
                <Image src="/category-beverages.jpg" alt="Beverages" width={225} height={285} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-[#181818]">Beverages</h3>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-2xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-lg bg-white">
              <div className="h-[285px] overflow-hidden">
                <Image src="/category-desserts.jpg" alt="Desserts & Treats" width={225} height={285} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-[#181818]">Desserts & Treats</h3>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-lg bg-white">
              <div className="h-[285px] overflow-hidden">
                <Image src="/category-condiments.jpg" alt="Condiments & Sauces" width={225} height={285} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-[#181818]">Condiments & Sauces</h3>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link 
              href="/categories" 
              className="border border-[#f5f1dd] text-[#f5f1dd] hover:bg-[#f5f1dd] hover:text-[#181818] px-8 py-3 rounded-full font-medium transition-colors inline-block"
            >
              See more
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#181818]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Testimonials</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            <div className="border border-gray-700 rounded-lg p-8 bg-[#181818]">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src="/avatar-1.jpg" alt="Claire Bell" width={50} height={50} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">Claire Bell</h3>
                  <p className="text-sm text-gray-400">Designer</p>
                </div>
              </div>
              <p className="text-gray-300">
                Slate helps you see how many more days you need to work to reach your financial goal for the month and year. Slate helps you see how many more days you need to work to reach your financial goal for the month and year.
              </p>
            </div>
            
            <div className="border border-gray-700 rounded-lg p-8 bg-[#181818]">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src="/avatar-2.jpg" alt="Francisco Lane" width={50} height={50} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">Francisco Lane</h3>
                  <p className="text-sm text-gray-400">Designer</p>
                </div>
              </div>
              <p className="text-gray-300">
                Slate helps you see how many more days you need to work to reach your financial goal for the month and year. Slate helps you see how many more days you need to work to reach your financial goal for the month and year.
              </p>
            </div>
            
            <div className="border border-gray-700 rounded-lg p-8 bg-[#181818]">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src="/avatar-3.jpg" alt="Ralph Fisher" width={50} height={50} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">Ralph Fisher</h3>
                  <p className="text-sm text-gray-400">Designer</p>
                </div>
              </div>
              <p className="text-gray-300">
                Slate helps you see how many more days you need to work to reach your financial goal for the month and year. Slate helps you see how many more days you need to work to reach your financial goal for the month and year.
              </p>
            </div>
            
            <div className="border border-gray-700 rounded-lg p-8 bg-[#181818]">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src="/avatar-4.jpg" alt="Jorge Murphy" width={50} height={50} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">Jorge Murphy</h3>
                  <p className="text-sm text-gray-400">Designer</p>
                </div>
              </div>
              <p className="text-gray-300">
                Slate helps you see how many more days you need to work to reach your financial goal for the month and year. Slate helps you see how many more days you need to work to reach your financial goal for the month and year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#181818]">
        <div className="container mx-auto px-4">
          <div className="bg-[#181818] border border-gray-700 rounded-xl p-12 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-3/5">
              <h2 className="text-3xl font-bold mb-6">Part of Your Complete Health Journey with Fitin</h2>
              <p className="text-gray-300 mb-8">
                Reccos is just one part of the comprehensive Fitin Club ecosystem. Our approach combines personalized coaching, sustainable habit formation, and practical tools like Reccos to make healthy living achievable for everyone.
              </p>
              <Link 
                href="/signup" 
                className="bg-[#536e3e] hover:bg-[#445a33] text-[#f5f1dd] px-10 py-4 rounded-full font-medium transition-colors inline-block"
              >
                Get Started with Fitin
              </Link>
            </div>
            
            <div className="md:w-2/5">
              <Image 
                src="/fitin-ecosystem.jpg" 
                alt="Fitin Ecosystem" 
                width={381} 
                height={364} 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#181818] py-16 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-6">About</h3>
              <ul className="space-y-4">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <ul className="space-y-4">
                <li>7480 Mockingbird Hill</li>
                <li>(239) 555-0108</li>
              </ul>
            </div>
            
            <div>
              <div className="w-[189px] h-[150px] relative">
                <Image 
                  src="/logo.png" 
                  alt="Reccos by Fitin" 
                  fill 
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
