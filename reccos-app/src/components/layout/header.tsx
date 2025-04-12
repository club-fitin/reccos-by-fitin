'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './logo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';

export function Header() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-brand-cream">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        
        <nav className="flex items-center space-x-6">
          <Link 
            href="/products" 
            className={`text-sm font-medium ${
              pathname === '/products' 
                ? 'text-brand-olive' 
                : 'text-brand-olive/70 hover:text-brand-olive'
            }`}
          >
            Products
          </Link>
          {user ? (
            <>
              <Link 
                href="/my-diet" 
                className={`text-sm font-medium ${
                  pathname === '/my-diet' 
                    ? 'text-brand-olive' 
                    : 'text-brand-olive/70 hover:text-brand-olive'
                }`}
              >
                My Diet
              </Link>
              <Button 
                variant="ghost" 
                className="text-brand-olive hover:text-brand-olive/70"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button 
                variant="ghost" 
                className="text-brand-olive hover:text-brand-olive/70"
              >
                Sign In
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
} 