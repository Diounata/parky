import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthenticationApi } from "../../../api/authentication-api";

export function useSignUpAccountMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AuthenticationApi.signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authenticated-account"] });
    },
  });
}
