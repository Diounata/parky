import { Module } from '@nestjs/common';
import { SignInAccountUseCase } from 'src/application/use-cases/accounts/sign-in-account';
import { SignUpAccountUseCase } from 'src/application/use-cases/accounts/sign-up-account';
import { CryptographyModule } from 'src/infra/cryptography/cryptography.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import { SignInAccountController } from '../controllers/accounts/sign-in-account.controller';
import { SignUpAccountController } from '../controllers/accounts/sign-up-account.controller';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [SignInAccountController, SignUpAccountController],
  providers: [SignInAccountUseCase, SignUpAccountUseCase],
})
export class AccountsModule {}
