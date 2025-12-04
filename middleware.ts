// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and favicon
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api/edgestore")
  ) {
    return NextResponse.next();
  }

  // Temporary bypass for API requests (Thunder Client, etc.)
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Public pages
  const publicPaths = ["/", "/login", "/register", "/ReadyToShip"];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

 
  const cookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-authjs.session-token"
      : "authjs.session-token";

  // Get JWT token from cookie
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET, 
    cookieName,
  });

  console.log("token", token);

  if (!token) {
    console.log("No token – redirecting to login");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
  runtime: "nodejs", //read secure cookies on Vercel
};