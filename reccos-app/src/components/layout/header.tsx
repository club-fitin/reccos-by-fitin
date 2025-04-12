import { useAuth } from '@/contexts/auth-context';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SignOutButton } from '@/components/auth/sign-out-button';

export function Header() {
  const { user, loading, isAdmin } = useAuth();

  return (
    <header className="border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">
            Reccos by Fitin
          </Link>
          
          {!loading && (
            <nav className="ml-10 hidden md:flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600">
                Home
              </Link>
              
              {user && (
                <Link href="/my-diet" className="text-gray-600 hover:text-blue-600">
                  My Diet
                </Link>
              )}
              
              {isAdmin && (
                <>
                  <Link href="/admin/products" className="text-gray-600 hover:text-blue-600">
                    Products
                  </Link>
                  <Link href="/admin/categories" className="text-gray-600 hover:text-blue-600">
                    Categories
                  </Link>
                  <Link href="/admin/meal-types" className="text-gray-600 hover:text-blue-600">
                    Meal Types
                  </Link>
                  <Link href="/admin/users" className="text-gray-600 hover:text-blue-600">
                    Users
                  </Link>
                </>
              )}
            </nav>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <Link
            href="https://fitin.club"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600"
          >
            Join Fitin
          </Link>
          
          <Link href="/contact" className="text-gray-600 hover:text-blue-600">
            Support
          </Link>
          
          {!loading && (
            <div>
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link href="/profile" className="text-gray-600 hover:text-blue-600">
                    Profile
                  </Link>
                  <SignOutButton />
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login">
                    <Button variant="outline">Login</Button>
                  </Link>
                  <Link href="/signup">
                    <Button>Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 