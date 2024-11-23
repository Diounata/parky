export interface SignInRequestData {
  account: {
    email: string;
    rawPassword: string;
  };
}

export interface SignUpRequestData {
  account: {
    name: string;
    email: string;
    rawPassword: string;
  };
}

export type AuthenticationResponse = { accessToken: string };
