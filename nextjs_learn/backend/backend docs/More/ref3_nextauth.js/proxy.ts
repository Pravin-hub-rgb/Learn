import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {           // ← function naam same rehta hai auth wrapper ke saath
  const isLoggedIn = !!req.auth
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard") ||
                           req.nextUrl.pathname.startsWith("/profile")
  const isAuthRoute = req.nextUrl.pathname.startsWith("/login")

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
  }

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}