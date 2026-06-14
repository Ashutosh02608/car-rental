export { default as proxy } from "next-auth/middleware"

export const config = { 
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - login (login page)
     * - auth/callback (auth callbacks)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - root (homepage)
     */
    "/((?!api/auth|login|auth/callback|_next/static|_next/image|favicon.ico|$).*)",
  ] 
}
