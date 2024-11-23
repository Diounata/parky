"use client";
import { Logo } from "@/components/logo";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthenticationFormProps } from ".";

export function AuthenticationFormHeader({ type }: AuthenticationFormProps) {
  return (
    <CardHeader>
      <Logo className="mb-2" />

      <CardTitle className="text-2xl">Sign {type.split("-")[1]}</CardTitle>

      <CardDescription>
        Enter your credentials below to{" "}
        {type === "sign-in" ? "sign in to" : "sign up"} your account
      </CardDescription>
    </CardHeader>
  );
}
