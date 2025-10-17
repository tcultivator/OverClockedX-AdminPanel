// middleware.ts
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET })

    // If no token and trying to access protected route
    if (!token) {
        console.log('no token')
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}
export const config = {
    matcher: ["/LandingPage/:path*"],
};
