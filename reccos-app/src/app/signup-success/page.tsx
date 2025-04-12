import Link from 'next/link';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Sign Up Successful - Reccos by Fitin',
  description: 'Your Reccos by Fitin account has been created',
};

export default function SignUpSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 text-green-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Account Created Successfully!</h1>
        
        <p className="text-gray-600 mb-8">
          Thank you for creating an account with Reccos by Fitin. Please check your email for a confirmation link
          to verify your account. Once verified, you can log in and start exploring healthy product recommendations.
        </p>
        
        <div className="space-y-4">
          <Link href="/login">
            <Button className="w-full">
              Go to Login
            </Button>
          </Link>
          
          <Link href="/">
            <Button variant="outline" className="w-full">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 