// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;


  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }


  if (pathname.startsWith("/api/edgestore")) {
    return NextResponse.next();
  }


  // this is temporary, i need to delete it before deploying in production, i need this so my middle ware wont block thunder client
    if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }


  const publicPaths = ["/", "/login", "/register","/ReadyToShip"];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }


  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
 
  if (!token) {
    console.log("No token – redirecting to login");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
