import { Module } from '@nestjs/common';
import { AccountsModule } from './modules/accounts-module';

@Module({
  imports: [AccountsModule],
})
export class HttpModule {}
