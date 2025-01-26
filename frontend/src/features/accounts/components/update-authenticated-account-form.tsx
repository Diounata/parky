"use client";
import { If } from "@/components/if";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/form/input";
import { SubmitButton } from "@/components/ui/form/submit-button";
import { formatDistanceToNow } from "date-fns";
import { useUpdateAccount } from "../hooks/forms/use-update-account";
import { useGetAuthenticatedAccountQuery } from "../hooks/react-query/queries/use-get-authenticated-account-query";

export function UpdateAuthenticatedAccountForm() {
  const { data: authenticatedAccount } = useGetAuthenticatedAccountQuery();
  const { updateAccountForm, onSubmit } = useUpdateAccount();

  return (
    <Form {...updateAccountForm}>
      <form
        onSubmit={updateAccountForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <Input label="Name" name="name" />
        <Input label="Email" name="email" />

        <p className="my-0 text-sm text-gray-300">
          Created{" "}
          {formatDistanceToNow(new Date(authenticatedAccount.createdAt), {
            addSuffix: true,
          })}
          .{" "}
          <If condition={!!authenticatedAccount.updatedAt}>
            Updated{" "}
            {formatDistanceToNow(new Date(authenticatedAccount.updatedAt), {
              addSuffix: true,
            })}
            .
          </If>
        </p>

        <SubmitButton
          onSubmitChildren="Updating changes..."
          className="w-full lg:w-1/2"
        >
          Update changes
        </SubmitButton>
      </form>
    </Form>
  );
}
