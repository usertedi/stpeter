import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define paths that are considered public (no auth required)
  const isPublicPath = path === '/admin/login';

  // Get the JWT token from the cookies
  const token = request.cookies.get('token')?.value || '';

  // Redirect logic for authentication
  if (isPublicPath && token) {
    // If user is on login page but already has a token, redirect to admin dashboard
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  if (!isPublicPath && !token && path.startsWith('/admin')) {
    // If user is trying to access protected admin routes without a token, redirect to login
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Continue with the request if authentication checks pass
  return NextResponse.next();
}

// Configure which paths this middleware will run on
export const config = {
  matcher: [
    '/admin/:path*',
  ],
};