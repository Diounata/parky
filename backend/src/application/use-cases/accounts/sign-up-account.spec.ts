import { FakeEncrypter } from 'test/cryptography/fake-encrypter';
import { makeAccount } from 'test/factories/make-account';
import { InMemoryAccountsRepository } from '../../../infra/database/in-memory-databases/in-memory-accounts-repository';
import { AccountsRepository } from '../../repositories/accounts-repository';
import { EmailBeingUsedError } from './errors/email-being-used-error';
import { Input, SignUpAccountUseCase } from './sign-up-account';

let accountsRepository: AccountsRepository;
let fakeEncrypter: FakeEncrypter;
let sut: SignUpAccountUseCase;

describe('[UC] Sign up account', () => {
  beforeEach(() => {
    accountsRepository = new InMemoryAccountsRepository();
    fakeEncrypter = new FakeEncrypter();
    sut = new SignUpAccountUseCase(accountsRepository, fakeEncrypter);
  });

  it('should sign up an account', async () => {
    const input: Input = {
      account: {
        name: 'Account name',
        email: 'new.account@email.com',
        rawPassword: '123456',
      },
    };

    const result = await sut.handle(input);

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });

  it('should not sign up an account with an email being used', async () => {
    const input: Input = {
      account: {
        name: 'John Doe',
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

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EmailBeingUsedError);
  });
});
