import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/authentication"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.match(route));
  const isPublicRoute = publicRoutes.some((route) => path.match(route));
  const cookie = cookies().get("auth-jwt-token")?.value;
  const session = cookie ? decodeJwt(cookie) : undefined;

  if (isProtectedRoute && !session?.sub) {
    return NextResponse.redirect(
      new URL("/authentication/sign-in", req.nextUrl),
    );
  }

  if (isPublicRoute && session?.sub) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}
