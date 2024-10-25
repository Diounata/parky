import { UseCaseError } from '../use-case-error';

export class InvalidCredentialsError extends Error implements UseCaseError {
  code: string;

  constructor() {
    super('Invalid credentials');
    this.code = 'invalid-credentials';
  }
}
