import { setJwtTokenCookie } from "@/app/authentication/actions";
import { toast } from "@/hooks/use-toast";
import { handleAxiosRequestError } from "@/lib/react-hook-forms/handle-request-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { authenticationFormErrors } from "../../helpers/form-errors";
import {
  SignInAccountFormInput,
  signInAccountFormSchema,
} from "../../validators/sign-in-account-form-schema";
import { useSignInMutation } from "../react-query/mutations/use-sign-in-mutation";

export function useSignInAccount() {
  const signInMutation = useSignInMutation();
  const signInAccountForm = useForm<SignInAccountFormInput>({
    resolver: zodResolver(signInAccountFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInAccountFormInput> = useCallback(
    async ({ email, password }) => {
      try {
        const data = await signInMutation.mutateAsync({
          account: { email, rawPassword: password },
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
            form: signInAccountForm,
            formErrors: authenticationFormErrors,
          });
      }
    },
    [signInAccountForm, signInMutation],
  );

  return {
    signInAccountForm,
    onSubmit,
  };
}
