import { If } from "@/components/if";
import { CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/form/input";
import { SubmitButton } from "@/components/ui/form/submit-button";
import { AuthenticationFormProps } from ".";
import { AuthenticationFormFooter } from "./authentication-form-footer";

export function AuthenticationFormComponent(props: AuthenticationFormProps) {
  const { type, form, onSubmit } = props;

  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-3">
            <If condition={type === "sign-up"}>
              <Input name="name" label="Name" />
            </If>

            <Input name="email" label="Email" />

            <div className="flex flex-col gap-3 md:flex-row">
              <Input
                name="password"
                label="Password"
                inputProps={{ type: "password" }}
              />

              <If condition={type === "sign-up"}>
                <Input
                  name="repeatPassword"
                  label="Repeat password"
                  inputProps={{ type: "password" }}
                />
              </If>
            </div>

            <SubmitButton
              className="mt-3"
              onSubmitChildren={
                type === "sign-in" ? "Signing in" : "Signing up"
              }
            >
              {type === "sign-in" ? "Sign in" : "Sign up"}
            </SubmitButton>
          </div>

          <AuthenticationFormFooter {...props} />
        </form>
      </Form>
    </CardContent>
  );
}
