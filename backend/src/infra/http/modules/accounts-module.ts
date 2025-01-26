import { UpdateAccountUseCase } from '@/application/use-cases/accounts/update-account';
import { Module } from '@nestjs/common';
import { GetAuthenticatedAccountQuery } from 'src/application/queries/accounts/get-authenticated-account';
import { SignInAccountUseCase } from 'src/application/use-cases/accounts/sign-in-account';
import { SignUpAccountUseCase } from 'src/application/use-cases/accounts/sign-up-account';
import { CryptographyModule } from 'src/infra/cryptography/cryptography.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import { GetAuthenticatedAccountController } from '../controllers/accounts/get-authenticated-account.controller';
import { SignInAccountController } from '../controllers/accounts/sign-in-account.controller';
import { SignUpAccountController } from '../controllers/accounts/sign-up-account.controller';
import { UpdateAuthenticatedAccountController } from '../controllers/accounts/update-authenticated-account.controller';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    GetAuthenticatedAccountController,
    SignInAccountController,
    SignUpAccountController,
    UpdateAuthenticatedAccountController,
  ],
  providers: [
    GetAuthenticatedAccountQuery,
    SignInAccountUseCase,
    SignUpAccountUseCase,
    UpdateAccountUseCase,
  ],
})
export class AccountsModule {}
