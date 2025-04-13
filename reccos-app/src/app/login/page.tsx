import Link from 'next/link';
import { LoginForm } from '@/components/auth/login-form';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Login - Reccos by Fitin',
  description: 'Login to your Reccos by Fitin account',
};

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Login to Reccos by Fitin</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
          </Suspense>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 