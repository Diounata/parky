import { setJwtTokenCookie } from "@/app/authentication/actions";
import { toast } from "@/hooks/use-toast";
import { handleAxiosRequestError } from "@/lib/react-hook-forms/handle-request-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { authenticationFormErrors } from "../../helpers/form-errors";
import {
  SignUpAccountFormInput,
  signUpAccountFormSchema,
} from "../../validators/sign-up-account-form-schema";
import { useSignUpMutation } from "../react-query/use-sign-up-mutation";

export function useSignUpAccount() {
  const signUpMutation = useSignUpMutation();
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
    async ({ name, email, password }) => {
      try {
        const data = await signUpMutation.mutateAsync({
          account: { name, email, rawPassword: password },
        });

        setJwtTokenCookie(data.accessToken).then(() => {
          toast({
            title: "Sign in",
            description: "You have successfully signed in",
          });
        });
      } catch (e) {
        if (e instanceof AxiosError)
          handleAxiosRequestError({
            e,
            form: signUpAccountForm,
            formErrors: authenticationFormErrors,
          });
      }
    },
    [signUpAccountForm, signUpMutation],
  );

  return {
    signUpAccountForm,
    onSubmit,
  };
}
