"use client";
import { useGetAuthenticatedAccountQuery } from "@/features/accounts/hooks/react-query/queries/use-get-authenticated-account-query";

export default function DashboardPage() {
  const { data: authenticatedAccount } = useGetAuthenticatedAccountQuery();

  return (
    <div>
      <p>Welcome back, {authenticatedAccount.name}.</p>
    </div>
  );
}
