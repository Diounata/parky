"use client";
import dynamic from "next/dynamic";
import { useSignInAccount } from "../../hooks/forms/use-sign-in-account";
import { LoadingForm } from "../loading-form";

const AuthenticationForm = dynamic(
  () =>
    import(
      "@/features/authentication/components/authentication-form-container"
    ).then((component) => component.AuthenticationForm),
  {
    ssr: false,
    loading: () => <LoadingForm />,
  },
);

export function SignInForm() {
  const { signInAccountForm: form, onSubmit } = useSignInAccount();

  return <AuthenticationForm type="sign-in" form={form} onSubmit={onSubmit} />;
}
