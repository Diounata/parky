import { Module } from '@nestjs/common';
import { GetAuthenticatedAccountQuery } from 'src/application/queries/accounts/get-authenticated-account';
import { SignInAccountUseCase } from 'src/application/use-cases/accounts/sign-in-account';
import { SignUpAccountUseCase } from 'src/application/use-cases/accounts/sign-up-account';
import { CryptographyModule } from 'src/infra/cryptography/cryptography.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import { GetAuthenticatedAccountController } from '../controllers/accounts/get-authenticated-account.controller';
import { SignInAccountController } from '../controllers/accounts/sign-in-account.controller';
import { SignUpAccountController } from '../controllers/accounts/sign-up-account.controller';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    SignInAccountController,
    SignUpAccountController,
    GetAuthenticatedAccountController,
  ],
  providers: [
    SignInAccountUseCase,
    SignUpAccountUseCase,
    GetAuthenticatedAccountQuery,
  ],
})
export class AccountsModule {}
