"use server";
import { configuration } from "@/lib/config/configuration";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setJwtTokenCookie(accessToken: string) {
  const cookieName = "auth-jwt-token";
  const expiresAt = decodeJwt(accessToken).exp;

  cookies().set(cookieName, accessToken, {
    secure: true,
    httpOnly: true,
    expires: expiresAt ? new Date(expiresAt * 1000) : undefined,
  });

  redirect(configuration.paths.dashboard.home);
}

export async function logout() {
  cookies().delete("auth-jwt-token");
  redirect(configuration.paths.authentication.signIn);
}
