import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware to protect routes and redirect if user is not authenticated
export function middleware(request: NextRequest) {
  const { cookies } = request;

  // Check if the access token is available in cookies
  const accessToken = cookies.get('accessToken');

  // If no access token is found, redirect to login
  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Proceed with the request if authenticated
  return NextResponse.next();
}

// Define which paths this middleware should apply to
export const config = {
  matcher: ['/tasks/:path*'], // Apply middleware to all tasks-related routes
};
