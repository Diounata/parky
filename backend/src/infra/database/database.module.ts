import { DatabaseConnection } from '@/application/database/database-connection';
import { AccountsRepository } from '@/application/repositories/accounts-repository';
import { Module } from '@nestjs/common';
import { PgDatabaseConnectionService } from './pg/pg-database-connection.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAccountsRepository } from './prisma/repositories/prisma-accounts-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: AccountsRepository,
      useClass: PrismaAccountsRepository,
    },
    {
      provide: DatabaseConnection,
      useClass: PgDatabaseConnectionService,
    },
  ],
  exports: [PrismaService, DatabaseConnection, AccountsRepository],
})
export class DatabaseModule {}
