import Link from 'next/link';
import { SignUpForm } from '@/components/auth/signup-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - Reccos by Fitin',
  description: 'Create your Reccos by Fitin account',
};

export default function SignUpPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Create a Reccos by Fitin Account</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <SignUpForm />
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 