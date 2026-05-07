import { updateSession } from "@/lib/supabase/middleware"
import type { NextRequest } from "next/server"
import createMiddleware from "next-intl/middleware"
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing)

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return await updateSession(request)
  }
  return intlMiddleware(request)
}

export const config = {
  matcher: [
    "/admin/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
}
