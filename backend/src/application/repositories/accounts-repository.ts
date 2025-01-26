import { Account } from '../../domain/entities/account';

export abstract class AccountsRepository {
  abstract create(account: Account): Promise<void>;
  abstract update(account: Account): Promise<void>;
  abstract findAccountById(id: string): Promise<Account | null>;
  abstract findAccountByEmail(email: string): Promise<Account | null>;
}
