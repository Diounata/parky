import { UseFormReturn } from "react-hook-form";

interface RegisterFormErrorProps {
  form: UseFormReturn<any>;
  name: string;
  message: string;
}

export function registerFormError({
  form,
  name,
  message,
}: RegisterFormErrorProps) {
  form.setError(name, { message });
}
