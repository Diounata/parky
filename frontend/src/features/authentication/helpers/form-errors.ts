import { FormErrorProps } from "@/lib/react-hook-forms/handle-request-error";

interface Props {
  [key: string]: FormErrorProps;
}

export const authenticationFormErrors: Props = {
  "email-being-used": {
    name: "email",
    message: "This email is already being used by an account",
  },
  "account-not-found": {
    name: "email",
    message: "Account not found",
  },
  "invalid-credentials": {
    name: "password",
    message: "Invalid credentials",
  },
};
