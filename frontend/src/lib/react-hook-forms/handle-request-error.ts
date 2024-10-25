import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { registerFormError } from "./register-form-error";
import { UseFormReturn } from "react-hook-form";

export interface FormErrorProps {
  name: string;
  message: string;
}

interface Props {
  e: AxiosError<any>;
  form: UseFormReturn<any>;
  formErrors: { [key: string]: FormErrorProps };
}

export function handleAxiosRequestError({ e, form, formErrors }: Props) {
  if (!(e.response?.data.code in formErrors)) {
    return toast({
      title: "Error",
      description: "An unexpected error occurred.",
    });
  }

  registerFormError({
    form,
    ...formErrors[e.response?.data.code],
  });
}
