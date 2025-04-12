'use client';

import * as React from 'react';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Reccos by Fitin</h3>
            <p className="text-sm text-gray-600">
              Discover healthy food alternatives recommended by Fitin Club
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/products" className="text-sm text-gray-600 hover:text-gray-900">
                  Products
                </a>
              </li>
              <li>
                <a href="/my-diet" className="text-sm text-gray-600 hover:text-gray-900">
                  My Diet
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Fitin Club</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://fitin.club" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Visit Fitin Club
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Fitin Club. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 