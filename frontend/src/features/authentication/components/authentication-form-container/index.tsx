import { Card } from "@/components/ui/card";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { AuthenticationFormComponent } from "./authentication-form-component";
import { AuthenticationFormHeader } from "./authentication-form-header";

export interface AuthenticationFormProps {
  type: "sign-in" | "sign-up";
  form: UseFormReturn<any>;
  onSubmit: SubmitHandler<any>;
}

export function AuthenticationForm(props: AuthenticationFormProps) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-muted p-4 dark:bg-inherit">
      <Card className="w-full md:w-[600px]">
        <AuthenticationFormHeader {...props} />
        <AuthenticationFormComponent {...props} />
      </Card>
    </div>
  );
}
