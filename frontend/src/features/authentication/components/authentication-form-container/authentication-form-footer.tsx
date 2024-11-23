import { configuration } from "@/lib/config/configuration";
import Link from "next/link";
import { AuthenticationFormProps } from ".";

export function AuthenticationFormFooter({ type }: AuthenticationFormProps) {
  if (type === "sign-in") {
    return (
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href={configuration.paths.authentication.signUp}
          className="underline"
        >
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-4 text-center text-sm">
      Have an account?{" "}
      <Link
        href={configuration.paths.authentication.signIn}
        className="underline"
      >
        Sign in
      </Link>
    </div>
  );
}
