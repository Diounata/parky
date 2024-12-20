import { InvalidCredentialsError } from 'src/core/errors/errors/invalid-credentials-error';
import { FakeEncrypter } from 'test/cryptography/fake-encrypter';
import { makeAccount } from 'test/factories/make-account';
import { InMemoryAccountsRepository } from '../../../infra/database/in-memory-databases/in-memory-accounts-repository';
import { AccountsRepository } from '../../repositories/accounts-repository';
import { AccountNotFoundError } from './errors/account-not-found';
import { Input, SignInAccountUseCase } from './sign-in-account';

let accountsRepository: AccountsRepository;
let fakeEncrypter: FakeEncrypter;
let sut: SignInAccountUseCase;

describe('[UC] Sign in account', () => {
  beforeEach(() => {
    accountsRepository = new InMemoryAccountsRepository();
    fakeEncrypter = new FakeEncrypter();
    sut = new SignInAccountUseCase(accountsRepository, fakeEncrypter);
  });

  it('should sign in an account with correct credentials', async () => {
    const input: Input = {
      account: {
        email: 'johndoe@email.com',
        rawPassword: '123456',
      },
    };
    const account = makeAccount({
      email: input.account.email,
      password: input.account.rawPassword,
    });
    accountsRepository.create(account);

    const result = await sut.handle(input);

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });

  it('should not sign in an account with wrong credentials', async () => {
    const input: Input = {
      account: {
        email: 'johndoe@email.com',
        rawPassword: '654321',
      },
    };
    const account = makeAccount({
      email: input.account.email,
      password: '123456',
    });
    accountsRepository.create(account);

    const result = await sut.handle(input);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidCredentialsError);
  });

  it('should throws when trying to sign in a non existent account', async () => {
    const input: Input = {
      account: {
        email: 'non.existent.account@email.com',
        rawPassword: '123456',
      },
    };

    const result = await sut.handle(input);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(AccountNotFoundError);
  });
});
