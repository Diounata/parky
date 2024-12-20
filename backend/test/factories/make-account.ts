import { Account, AccountProps } from '@/domain/entities/account';
import { PrismaAccountsMapper } from '@/infra/database/prisma/mappers/prisma-accounts-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export function makeAccount(override: Partial<AccountProps> = {}) {
  const account = new Account({
    id: uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    passwordType: 'plain',
    ...override,
  });

  return account;
}

@Injectable()
export class AccountFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAccount(data: Partial<AccountProps> = {}): Promise<Account> {
    const account = makeAccount(data);

    await this.prisma.account.create({
      data: PrismaAccountsMapper.toPrisma(account),
    });

    return account;
  }
}
