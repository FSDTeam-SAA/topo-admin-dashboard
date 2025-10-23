// middleware.ts (root directory)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // EdgeStore requires this header for authentication
  if (request.nextUrl.pathname.startsWith('/api/edgestore')) {
    response.headers.set('Access-Control-Allow-Credentials', 'true')
    response.headers.set(
      'Access-Control-Allow-Origin',
      request.headers.get('origin') || '*'
    )
    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET,OPTIONS,PATCH,DELETE,POST,PUT'
    )
    response.headers.set(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, edgestore-ctx'
    )
  }

  return response
}

export const config = {
  matcher: '/api/edgestore/:path*',
}
