import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthenticationApi } from "../../api/authentication-api";

export function useSignUpMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: new AuthenticationApi().signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authenticated-account"] });
    },
  });
}
