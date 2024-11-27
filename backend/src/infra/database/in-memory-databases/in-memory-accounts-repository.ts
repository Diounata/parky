import { Injectable } from '@nestjs/common';
import { AccountsRepository } from '../../../application/repositories/accounts-repository';
import { Account } from '../../../domain/entities/account';

@Injectable()
export class InMemoryAccountsRepository implements AccountsRepository {
  accounts: Account[] = [
    new Account({
      id: 'account-id',
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      passwordType: 'bcrypt',
    }),
  ];

  async create(account: Account): Promise<void> {
    this.accounts.push(account);
  }

  async findAccountByEmail(email: string): Promise<Account | null> {
    const account = this.accounts.find(
      (account) => account.getEmail() === email,
    );
    return account ?? null;
  }
}
