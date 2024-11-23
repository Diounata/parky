import { SignUpForm } from "@/features/authentication/components/authentication-form-pages/sign-up-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignUpAccountPage() {
  return <SignUpForm />;
}
