import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-next-cache-tags', 'dashboard-pages')
 
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
 
  response.headers.set('Cache-Control', 's-maxage=3600')
  
  return response
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*'],
}
