import { Prisma, Account as PrismaAccount } from '@prisma/client';
import { Account } from 'src/domain/entities/account';

export class PrismaAccountsMapper {
  static toDomain(raw: PrismaAccount): Account {
    return new Account({
      id: raw.id,
      name: raw.name,
      email: raw.email,
      password: raw.passwordHash,
      passwordType: raw.passwordType,
      timestamp: {
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
    });
  }

  static toPrisma(account: Account): Prisma.AccountUncheckedCreateInput {
    return {
      id: account.getId(),
      name: account.getName(),
      email: account.getEmail(),
      passwordHash: account.getPasswordValue(),
      passwordType: account.getPasswordType(),
      createdAt: account.getTimestamp().getCreatedAt(),
      updatedAt: account.getTimestamp().getUpdatedAt(),
    };
  }
}
