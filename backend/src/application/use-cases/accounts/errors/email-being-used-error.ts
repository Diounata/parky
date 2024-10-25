import { UseCaseError } from 'src/core/errors/use-case-error';

export class EmailBeingUsedError extends Error implements UseCaseError {
  code: string;

  constructor(email: string) {
    super(`Email "${email}" is already being used by an account.`);
    this.code = 'email-being-used';
  }
}
