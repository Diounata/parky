"use client";
import { Avatar } from "@/components/ui/avatar";
import { UpdateAuthenticatedAccountForm } from "@/features/accounts/components/update-authenticated-account-form";
import { useGetAuthenticatedAccountQuery } from "@/features/accounts/hooks/react-query/queries/use-get-authenticated-account-query";

export default function AccountPage() {
  const { data: account } = useGetAuthenticatedAccountQuery();

  return (
    <div className="flex flex-col gap-10 md:flex-row">
      <aside className="hidden lg:flex">
        <Avatar src="" fallback={account.name} className="h-32 w-32 text-7xl" />
      </aside>

      <main className="w-full lg:w-[400px]">
        <header className="mb-6">
          <h2 className="text-3xl font-semibold tracking-tight transition-colors">
            Account settings
          </h2>
        </header>

        <UpdateAuthenticatedAccountForm />
      </main>
    </div>
  );
}
