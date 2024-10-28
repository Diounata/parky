import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/inputs/input";

import type { AuthenticationFormComponentProps } from ".";
import { SubmitButton } from "@/components/ui/inputs/submit-button";

export function AuthenticationForm({
  type,
  form,
  onSubmit,
}: AuthenticationFormComponentProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-7"
      >
        <main className="flex w-full flex-col gap-4">
          {type === "sign-up" ? <Input name="name" label="Name" /> : null}
          <Input name="email" label="Email" inputProps={{ type: "email" }} />

          <section className="flex flex-col gap-4 md:flex-row md:gap-4">
            <Input
              name="password"
              label="Password"
              inputProps={{ type: "password" }}
            />

            {type === "sign-up" ? (
              <Input
                name="repeatPassword"
                label="Repeat password"
                inputProps={{ type: "password" }}
              />
            ) : null}
          </section>
        </main>

        <footer className="flex w-full flex-col items-center gap-1.5">
          <SubmitButton
            submittingMessage={`Signing ${type === "sign-in" ? "in" : "up"}`}
            className="w-full"
          >
            Sign {type === "sign-in" ? "in" : "up"}
          </SubmitButton>

          <p className="text-sm">
            or sign {type === "sign-in" ? "up" : "in"}{" "}
            <Link
              href={`/authentication/sign-${type === "sign-in" ? "up" : "in"}`}
              className="underline"
            >
              clicking here
            </Link>
          </p>
        </footer>
      </form>
    </Form>
  );
}
