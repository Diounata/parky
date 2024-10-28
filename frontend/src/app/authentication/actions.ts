"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decodeJwt } from "jose";

export async function setAuthenticationSession(accessToken: string) {
  const expiresAt = decodeJwt(accessToken).exp;

  cookies().set("auth-jwt-token", accessToken, {
    httpOnly: true,
    secure: true,
    expires: expiresAt ? new Date(expiresAt * 1000) : undefined,
  });

  redirect("/dashboard");
}
