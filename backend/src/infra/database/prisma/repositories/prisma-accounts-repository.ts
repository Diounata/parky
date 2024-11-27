import { Injectable } from '@nestjs/common';
import { AccountsRepository } from '../../../../application/repositories/accounts-repository';
import { Account } from '../../../../domain/entities/account';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAccountsRepository implements AccountsRepository {
  constructor(private prisma: PrismaService) {}

  async create(account: Account): Promise<void> {
    await this.prisma.account.create({
      data: {
        id: account.getId(),
        name: account.getName(),
        email: account.getEmail(),
        passwordHash: account.getPasswordValue(),
        passwordType: account.getPasswordType(),
        createdAt: account.getTimestamp().getCreatedAt(),
        updatedAt: null,
      },
    });
  }

  async findAccountByEmail(email: string): Promise<Account | null> {
    const account = await this.prisma.account.findUnique({ where: { email } });
    if (!account) return null;
    return new Account({
      id: account.id,
      name: account.name,
      email: account.email,
      password: account.passwordHash,
      passwordType: account.passwordType,
      timestamp: {
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
      },
    });
  }
}
