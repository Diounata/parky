import { Account } from '@/domain/entities/account';
import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { UseCaseError } from 'src/core/errors/use-case-error';
import { AccountsRepository } from '../../repositories/accounts-repository';
import { UseCase } from '../use-case';
import { AccountNotFoundError } from './errors/account-not-found';
import { EmailBeingUsedError } from './errors/email-being-used-error';

export interface Input {
  account: {
    id: string;
    name: string;
    email: string;
  };
}

export type Output = Either<UseCaseError, void>;

@Injectable()
export class UpdateAccountUseCase implements UseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async handle(input: Input): Promise<Output> {
    const accountById = await this.accountsRepository.findAccountById(
      input.account.id,
    );
    if (!accountById) {
      return left(new AccountNotFoundError({ id: input.account.id }));
    }

    const accountByEmail = await this.accountsRepository.findAccountByEmail(
      input.account.email,
    );
    if (accountByEmail && accountByEmail.getId() !== input.account.id) {
      return left(new EmailBeingUsedError(input.account.email));
    }

    await this.accountsRepository.update(
      new Account({
        id: input.account.id,
        name: input.account.name,
        email: input.account.email,
        password: accountById.getPasswordValue(),
        passwordType: accountById.getPasswordType(),
        timestamp: {
          createdAt: accountById.getTimestamp().getCreatedAt(),
          updatedAt: new Date(),
        },
      }),
    );

    return right(null);
  }
}
