import { axiosClient } from "@/lib/axios-client";
import {
  AuthenticationResponse,
  SignInRequestData,
  SignUpRequestData,
} from "./authentication-api-types";

export class AuthenticationApi {
  private static readonly endpoint = "accounts";

  static async signIn(data: SignInRequestData) {
    const response = await axiosClient.post<AuthenticationResponse>(
      `${AuthenticationApi.endpoint}/sign-in`,
      data,
    );
    return response.data;
  }

  static async signUp(data: SignUpRequestData) {
    const response = await axiosClient.post<AuthenticationResponse>(
      `${AuthenticationApi.endpoint}/sign-up`,
      data,
    );
    return response.data;
  }
}
