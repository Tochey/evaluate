// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useAuth } from '@lib/AuthContext'


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
   
    const cookie = request.cookies.get('evaluate')?.value
    console.log(cookie) // => 'fast'
 return
}

// See "Matching Paths" below to learn more
// write me a matcher config that rrun only on the pages folder and not on the api folder

export const config = {
    matcher: ['/api:path*'],
  }