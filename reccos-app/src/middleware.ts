import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // Handle protected routes
  const { pathname } = request.nextUrl;
  const { data: { session } } = await supabase.auth.getSession();
  
  // Define protected routes
  const authRoutes = ['/login', '/signup'];
  const protectedRoutes = ['/my-diet', '/admin'];
  const adminRoutes = ['/admin'];

  // Check if path starts with any of the protected routes
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

  // If user is logged in and tries to access auth routes, redirect to home
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If user is not logged in and tries to access protected routes, redirect to login
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is not an admin and tries to access admin routes, redirect to home
  if (isAdminRoute && session) {
    const user = session.user;
    const isAdmin = user.user_metadata?.role === 'ADMIN';
    
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.svg).*)',
  ],
}; 