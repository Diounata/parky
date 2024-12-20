import { AccountApi } from "@/features/accounts/api/account-api";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useGetAuthenticatedAccountQuery() {
  return useSuspenseQuery({
    queryFn: AccountApi.getAuthenticatedAccount,
    queryKey: ["authenticated-account"],
  });
}
