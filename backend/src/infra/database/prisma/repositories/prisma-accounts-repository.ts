import { Injectable } from '@nestjs/common';
import { AccountsRepository } from '../../../../application/repositories/accounts-repository';
import { Account } from '../../../../domain/entities/account';
import { PrismaAccountsMapper } from '../mappers/prisma-accounts-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAccountsRepository implements AccountsRepository {
  constructor(private prisma: PrismaService) {}

  async create(account: Account): Promise<void> {
    await this.prisma.account.create({
      data: PrismaAccountsMapper.toPrisma(account),
    });
  }

  async update(account: Account): Promise<void> {
    await this.prisma.account.update({
      where: { id: account.getId() },
      data: PrismaAccountsMapper.toPrisma(account),
    });
  }

  async findAccountById(id: string): Promise<Account | null> {
    const account = await this.prisma.account.findUnique({ where: { id } });
    if (!account) return null;
    return PrismaAccountsMapper.toDomain(account);
  }

  async findAccountByEmail(email: string): Promise<Account | null> {
    const account = await this.prisma.account.findUnique({ where: { email } });
    if (!account) return null;
    return PrismaAccountsMapper.toDomain(account);
  }
}
