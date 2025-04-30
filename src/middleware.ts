import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'



export function middleware(req: NextRequest) {
  console.log('Middleware executado')

  const token = req.cookies.get("token")

  console.log("Token via Cookies 🍪", token)

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()

}

export const config = {
  matcher: ['/pages/:path*'],
}
