import { UseCaseError } from 'src/core/errors/use-case-error';

export class AccountAlreadyExistsError extends Error implements UseCaseError {
  code: string;

  constructor(id: string) {
    super(`Account "${id}" already exists.`);
    this.code = 'account-already-exists';
  }
}
