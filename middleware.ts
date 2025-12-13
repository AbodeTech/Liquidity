import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const adminToken = request.cookies.get('adminAccessToken')?.value

  // Admin Routes Logic
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // If trying to access admin login page
    if (request.nextUrl.pathname === '/admin/login') {
      // If already logged in as admin, redirect to admin dashboard
      if (adminToken) {
        return NextResponse.redirect(new URL('/admin/applications', request.url))
      }
      // Allow access to login page
      return NextResponse.next()
    }

    // For all other admin routes, require admin token
    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Dashboard Routes Logic (User)
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Auth Routes Logic (Login/Register)
  if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/login',
    '/register'
  ],
}
