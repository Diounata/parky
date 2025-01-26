import { makeAccount } from 'test/factories/make-account';
import { InMemoryAccountsRepository } from '../../../infra/database/in-memory-databases/in-memory-accounts-repository';
import { AccountsRepository } from '../../repositories/accounts-repository';
import { AccountNotFoundError } from './errors/account-not-found';
import { EmailBeingUsedError } from './errors/email-being-used-error';
import { Input, UpdateAccountUseCase } from './update-account';

let accountsRepository: AccountsRepository;
let sut: UpdateAccountUseCase;

describe('[UC] Update account', () => {
  beforeEach(() => {
    accountsRepository = new InMemoryAccountsRepository();
    sut = new UpdateAccountUseCase(accountsRepository);
  });

  it('should update an existing account', async () => {
    const input: Input = {
      account: {
        id: 'account-id',
        name: 'Updated account name',
        email: 'updated-account@email.com',
      },
    };
    const account = makeAccount({
      id: input.account.id,
    });
    accountsRepository.create(account);

    const result = await sut.handle(input);

    expect(result.isRight()).toBe(true);
  });

  it('should update an account name but keeping its old email', async () => {
    const input: Input = {
      account: {
        id: 'account-id',
        name: 'Updated account name',
        email: 'updated-account@email.com',
      },
    };
    const account = makeAccount({
      id: input.account.id,
    });
    accountsRepository.create(account);

    const result = await sut.handle(input);

    expect(result.isRight()).toBe(true);
  });

  it('should throws when trying to update an account that does not exist', async () => {
    const input: Input = {
      account: {
        id: 'unexisting-account-id',
        name: 'Updated account name',
        email: 'updated-account@email.com',
      },
    };

    const result = await sut.handle(input);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(AccountNotFoundError);
  });

  it('should throws when trying to update an account email with an email already in use', async () => {
    const input: Input = {
      account: {
        id: 'account-id',
        name: 'Updated account name',
        email: 'updated-account@email.com',
      },
    };
    const accounts = [
      makeAccount({
        id: input.account.id,
      }),
      makeAccount({
        email: input.account.email,
      }),
    ];
    accounts.forEach((account) => accountsRepository.create(account));

    const result = await sut.handle(input);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EmailBeingUsedError);
  });

  it('should update an account name and keep its old email', async () => {
    const input: Input = {
      account: {
        id: 'account-id',
        name: 'Updated account name',
        email: 'updated-account@email.com',
      },
    };
    const account = makeAccount({
      id: input.account.id,
      email: input.account.email,
    });
    accountsRepository.create(account);

    const result = await sut.handle(input);

    expect(result.isRight()).toBe(true);
  });
});
