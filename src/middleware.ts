import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  // Get the path of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't need authentication
  const isPublicPath = path === "/sign-in" || path === "/sign-up";

  // Get the token from cookies
  const token = request.cookies.get("accessToken")?.value || "";

  let isValidToken = false;

  if (token) {
    try {
      // Validate the token (replace with your actual secret)
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      isValidToken = true;
    } catch (error) {
      // Token is invalid or expired
      isValidToken = false;
    }
  }

  // If trying to access a protected path without being logged in
  if (!isPublicPath && !isValidToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // If trying to access login page while already logged in
  if (isPublicPath && isValidToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// Configure which paths this middleware applies to
export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/studio",
    "/studio/:path*",
    "/profile/:path*",
  ],
};
