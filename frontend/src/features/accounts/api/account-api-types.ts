export interface GetAuthenticatedAccountResponseData {
  account: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface UpdateAuthenticatedAccountRequestData {
  account: {
    name: string;
    email: string;
  };
}
