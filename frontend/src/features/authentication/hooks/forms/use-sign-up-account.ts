import { toast } from "@/hooks/use-toast";
import { axiosClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  SignUpAccountFormInput,
  signUpAccountFormSchema,
} from "../../validators/sign-up-account-form-schema";
import { AxiosError } from "axios";
import { handleAxiosRequestError } from "@/lib/react-hook-forms/handle-request-error";
import { accountFormErrors } from "../../helpers/form-errors";
import { setAuthenticationSession } from "@/app/authentication/actions";

export function useSignUpAccount() {
  const signUpAccountForm = useForm<SignUpAccountFormInput>({
    resolver: zodResolver(signUpAccountFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpAccountFormInput> = useCallback(
    async ({ name, email, password: rawPassword }) => {
      try {
        const response = await axiosClient.post(
          "http://localhost:4000/accounts/sign-up",
          {
            account: {
              name,
              email,
              rawPassword,
            },
          },
        );

        await setAuthenticationSession(response.data.accessToken);

        toast({
          title: "Sign up",
          description: "You have successfully signed up.",
        });
      } catch (e) {
        if (e instanceof AxiosError)
          handleAxiosRequestError({
            e,
            form: signUpAccountForm,
            formErrors: accountFormErrors,
          });
      }
    },
    [signUpAccountForm],
  );

  return {
    signUpAccountForm,
    onSubmit,
  };
}
