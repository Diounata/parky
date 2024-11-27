import { Injectable } from '@nestjs/common';
import { Encrypter } from 'src/application/cryptography/encrypter';
import { Either, left, right } from 'src/core/either';
import { InvalidCredentialsError } from 'src/core/errors/errors/invalid-credentials-error';
import { UseCaseError } from 'src/core/errors/use-case-error';
import { AccountsRepository } from '../../repositories/accounts-repository';
import { UseCase } from '../use-case';
import { AccountNotFoundError } from './errors/account-not-found';

export interface Input {
  account: {
    email: string;
    rawPassword: string;
  };
}

export type Output = Either<UseCaseError, { accessToken: string }>;

@Injectable()
export class SignInAccountUseCase implements UseCase {
  constructor(
    private accountsRepository: AccountsRepository,
    private encrypter: Encrypter,
  ) {}

  async handle(input: Input): Promise<Output> {
    const account = await this.accountsRepository.findAccountByEmail(
      input.account.email,
    );
    if (!account)
      return left(new AccountNotFoundError({ email: input.account.email }));

    const isCorrectCredentials = account.verifyRawPassword(
      input.account.rawPassword,
    );
    if (!isCorrectCredentials) return left(new InvalidCredentialsError());

    const accessToken = await this.encrypter.encrypt({
      sub: account.getId(),
      name: account.getName(),
    });

    return right({
      accessToken,
    });
  }
}
