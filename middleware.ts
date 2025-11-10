import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if user is authenticated
  const role = request.cookies.get('role')?.value
  const uid = request.cookies.get('uid')?.value

  // Protected routes that require authentication
  const protectedRoutes = ['/admin', '/student', '/teacher']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // If accessing a protected route without authentication, redirect to home
  if (isProtectedRoute && (!role || !uid)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If logged in and trying to access home, redirect to appropriate dashboard
  if (pathname === '/' && role && uid) {
    return NextResponse.redirect(new URL(`/${role}/${uid}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/admin/:path*',
    '/student/:path*',
    '/teacher/:path*',
  ],
}

