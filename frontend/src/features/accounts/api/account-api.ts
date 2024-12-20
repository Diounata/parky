import { axiosClient } from "@/lib/axios-client";
import { GetAuthenticatedAccountResponseData } from "./account-api-types";

export class AccountApi {
  private static readonly endpoint = "accounts";

  static async getAuthenticatedAccount() {
    const response = await axiosClient.get<GetAuthenticatedAccountResponseData>(
      `queries/${AccountApi.endpoint}/get-authenticated-account`,
    );
    return response.data.account;
  }
}
