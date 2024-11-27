import { UseCaseError } from 'src/core/errors/use-case-error';

export class AccountNotFoundError extends Error implements UseCaseError {
  code: string;

  constructor({ id, email }: { id?: string; email?: string }) {
    super(
      `Account [id=${id ?? 'no-id-informed'}; email=${email ?? 'no-email-informed'}] not found.`,
    );
    this.code = 'account-not-found';
  }
}
