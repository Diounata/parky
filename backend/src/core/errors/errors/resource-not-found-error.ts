import { UseCaseError } from '../use-case-error';

export class ResourceNotFoundError extends Error implements UseCaseError {
  code: string;

  constructor() {
    super('Resource not found');
    this.code = 'resource-not-found';
  }
}
