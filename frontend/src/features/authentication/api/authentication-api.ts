import { axiosClient } from "@/lib/axios-client";
import {
  AuthenticationResponse,
  SignInRequestData,
  SignUpRequestData,
} from "./authentication-api-types";

interface AuthenticationApiEndpoints {
  signIn(data: SignInRequestData): Promise<AuthenticationResponse>;
  signUp(data: SignUpRequestData): Promise<AuthenticationResponse>;
}

export class AuthenticationApi implements AuthenticationApiEndpoints {
  private readonly endpoint = "accounts";

  constructor() {
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  async signIn(data: SignInRequestData) {
    const response = await axiosClient.post<AuthenticationResponse>(
      `${this.endpoint}/sign-in`,
      data,
    );
    return response.data;
  }

  async signUp(data: SignUpRequestData) {
    const response = await axiosClient.post<AuthenticationResponse>(
      `${this.endpoint}/sign-up`,
      data,
    );
    return response.data;
  }
}
