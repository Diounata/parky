"use client";
import dynamic from "next/dynamic";
import { useSignUpAccount } from "../../hooks/forms/use-sign-up-account";
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

export function SignUpForm() {
  const { signUpAccountForm: form, onSubmit } = useSignUpAccount();

  return <AuthenticationForm type="sign-up" form={form} onSubmit={onSubmit} />;
}
