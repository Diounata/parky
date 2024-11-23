import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { UseFormReturn } from "react-hook-form";
import { registerFormError } from "./register-form-error";

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
      title: "HTTP error",
      description:
        "An unexpected error occurred. Please try again later or contact support.",
    });
  }

  registerFormError({
    form,
    ...formErrors[e.response?.data.code],
  });
}
