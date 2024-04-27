import { verifyToken } from "@/utils/auth"
import { cookies } from "next/headers"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const accessToken = cookies().get("access")
  const productId = request.nextUrl.pathname.match(/\/items\/(\d+)\/edit$/)?.[1]
  const verifiedToken = accessToken && (await verifyToken(accessToken.value))

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/items", request.url))
  }

  if (!verifiedToken && productId) {
    return NextResponse.redirect(new URL(`/items/${productId}`, request.url))
  }
  if (
    verifiedToken &&
    ["/login", "/signup"].includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/items", request.url))
  }

  return response
}

export const config = {
  matcher: ["/((?!api|auth|_next/static|_next/image|.*\\.png$).*)"],
  unstable_allowDynamic: ["@/utils/auth.ts"],
}
