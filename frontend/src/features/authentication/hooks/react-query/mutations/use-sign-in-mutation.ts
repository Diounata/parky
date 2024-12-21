import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthenticationApi } from "../../../api/authentication-api";

export function useSignInMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AuthenticationApi.signIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authenticated-account"] });
    },
  });
}