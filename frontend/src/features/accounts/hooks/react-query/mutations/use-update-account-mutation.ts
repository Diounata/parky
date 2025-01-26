import { AccountApi } from "@/features/accounts/api/account-api";
import { AuthenticatedAccount } from "@/features/accounts/types/authenticated-account";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateAccountMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AccountApi.updateAuthenticatedAccount,
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ["authenticated-account"],
        (data: AuthenticatedAccount) => {
          return {
            ...data,
            ...variables.account,
            updatedAt: new Date().toISOString(),
          };
        },
      );
    },
  });
}
