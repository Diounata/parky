import { toast } from "@/hooks/use-toast";
import { axiosClient } from "@/lib/axios";
import { registerFormError } from "@/lib/react-hook-forms/register-form-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { accountFormErrors } from "../../helpers/form-errors";
import {
  SignInAccountFormInput,
  signInAccountFormSchema,
} from "../../validators/sign-in-account-form-schema";
import { handleAxiosRequestError } from "@/lib/react-hook-forms/handle-request-error";

export function useSignInAccount() {
  const signInAccountForm = useForm<SignInAccountFormInput>({
    resolver: zodResolver(signInAccountFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInAccountFormInput> = useCallback(
    async ({ email, password: rawPassword }) => {
      try {
        const response = await axiosClient.post("/accounts/sign-in", {
          account: {
            email,
            rawPassword,
          },
        });

        toast({
          title: "Sign in",
          description: JSON.stringify(response.data, null, "\t"),
        });
      } catch (e) {
        if (e instanceof AxiosError)
          handleAxiosRequestError({
            e,
            form: signInAccountForm,
            formErrors: accountFormErrors,
          });
      }
    },
    [signInAccountForm],
  );

  return {
    signInAccountForm,
    onSubmit,
  };
}
