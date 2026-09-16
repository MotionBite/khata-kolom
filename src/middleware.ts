import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getJwtSecretKey, verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Paths that don't require authentication
  if (pathname === '/admin/login' || pathname.startsWith('/api/admin/auth/login')) {
    // If user is already authenticated, redirect them to dashboard
    if (pathname === '/admin/login') {
      const token = request.cookies.get('admin_session')?.value;
      if (token) {
        try {
          const payload = await verifyToken(token);
          if (payload && payload.role === 'ADMIN') {
            return NextResponse.redirect(new URL('/admin', request.url));
          }
        } catch (err) {
          // Token is invalid/expired, let them stay on login page
        }
      }
    }
    return NextResponse.next();
  }

  // Protect all other /admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_session')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const payload = await verifyToken(token);
      
      if (!payload || payload.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      return NextResponse.next();
    } catch (err) {
      // Invalid or expired token
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_session');
      return response;
    }
  }

  // Prevent authenticated customers from accessing login/register
  if (pathname === '/login' || pathname === '/register') {
    const token = request.cookies.get('customer_session')?.value;
    if (token) {
      const payload = await verifyToken(token);
      if (payload) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/register'],
};
