import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Skip password protection for API routes and static files
  if (request.nextUrl.pathname.startsWith('/api') || 
      request.nextUrl.pathname.startsWith('/_next') ||
      request.nextUrl.pathname.includes('.')) {
    return NextResponse.next()
  }

  // Check for password in cookies
  const passwordCookie = request.cookies.get('site-password')
  const correctPassword = process.env.PASSWORD_PROTECT || 'unearthed2025'

  if (passwordCookie?.value === correctPassword) {
    return NextResponse.next()
  }

  // Check if this is a password submission
  if (request.method === 'POST' && request.nextUrl.pathname === '/auth') {
    // This would be handled by an API route
    return NextResponse.next()
  }

  // Redirect to login page if not authenticated
  if (request.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
