import { SignInForm } from "@/features/authentication/components/authentication-form-pages/sign-in-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignInAccountPage() {
  return <SignInForm />;
}
