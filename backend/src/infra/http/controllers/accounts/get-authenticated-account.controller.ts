import { Controller, Get, HttpException, Req, UseGuards } from '@nestjs/common';
import { GetAuthenticatedAccountQuery } from 'src/application/queries/accounts/get-authenticated-account';
import { AuthGuard } from 'src/infra/auth/auth.guard';

@Controller('queries/accounts')
export class GetAuthenticatedAccountController {
  constructor(
    private getAuthenticatedAccountQuery: GetAuthenticatedAccountQuery,
  ) {}

  @UseGuards(AuthGuard)
  @Get('get-authenticated-account')
  async handle(@Req() req) {
    const result = await this.getAuthenticatedAccountQuery.handle({
      accountId: req.user.userId,
    });

    if (result.isLeft()) {
      throw new HttpException(
        {
          code: result.value.code,
          message: result.value.message,
        },
        400,
      );
    }

    return result.value;
  }
}
