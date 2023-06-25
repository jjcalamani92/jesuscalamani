
export { default } from "next-auth/middleware"
import { NextFetchEvent, NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'



export async function middleware(req: NextRequest) {

  const token = await getToken({ req })
  // console.log('token', token)
  if ( token?.role !== "ADMIN_ROL" ) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url))
  }

}

export const config = {
  matcher: '/dashboard/:path*',
}