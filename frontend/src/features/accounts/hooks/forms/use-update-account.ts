import { authenticationFormErrors } from "@/features/authentication/helpers/form-errors";
import { toast } from "@/hooks/use-toast";
import { handleAxiosRequestError } from "@/lib/react-hook-forms/handle-request-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  UpdateAccountFormInput,
  updateAccountFormSchema,
} from "../../validators/update-account-form-schema";
import { useUpdateAccountMutation } from "../react-query/mutations/use-update-account-mutation";
import { useGetAuthenticatedAccountQuery } from "../react-query/queries/use-get-authenticated-account-query";

export function useUpdateAccount() {
  const { data: authenticatedAccount } = useGetAuthenticatedAccountQuery();
  const updateAccountMutation = useUpdateAccountMutation();
  const updateAccountForm = useForm<UpdateAccountFormInput>({
    resolver: zodResolver(updateAccountFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<UpdateAccountFormInput> = useCallback(
    async ({ name, email }) => {
      try {
        await updateAccountMutation.mutateAsync({
          account: { name, email },
        });

        toast({
          title: "Update account",
          description: "Account info updated successfully",
        });
      } catch (e) {
        if (e instanceof AxiosError)
          handleAxiosRequestError({
            e,
            form: updateAccountForm,
            formErrors: authenticationFormErrors,
          });
      }
    },
    [updateAccountForm, updateAccountMutation],
  );

  useEffect(() => {
    updateAccountForm.reset({
      name: authenticatedAccount?.name,
      email: authenticatedAccount?.email,
    });
  }, [authenticatedAccount, updateAccountForm]);

  return {
    updateAccountForm,
    onSubmit,
  };
}
