//protect all routes from access attempts without jwt

import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.headers.get('authorization')

  if (!token || !token.startsWith('Bearer ')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard'],  
}
