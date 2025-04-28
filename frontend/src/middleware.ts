import { auth } from '@/auth'
import { isDev } from '@/app/_utils/config'

const devRoutes: string[] = ['/ui']
const protectedRoutes: Set<string> = new Set(['/profile', '/community', '/overview', '/register/join-a-community/'])

export default auth((req) => {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.has(path) || [...protectedRoutes].some(prefix => path.startsWith(prefix))
  const isDevRoute = devRoutes.includes(path)
  const isLoggedIn = !!req.auth

  if (isDevRoute && !isDev) {
    return Response.redirect(new URL('/', req.nextUrl))
  }

  if (!isLoggedIn && isProtectedRoute && path !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})


// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}