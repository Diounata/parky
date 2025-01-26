import { AuthGuard } from '@/infra/auth/auth.guard';
import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UpdateAccountUseCase } from 'src/application/use-cases/accounts/update-account';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';

const updateAccountSchema = z.object({
  account: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
});

type UpdateAccountSchema = z.infer<typeof updateAccountSchema>;

@UseGuards(AuthGuard)
@Controller('accounts')
export class UpdateAuthenticatedAccountController {
  constructor(private updateAccountUseCase: UpdateAccountUseCase) {}

  @Put('update-authenticated-account')
  @HttpCode(200)
  async handle(
    @Req() req,
    @Body(new ZodValidationPipe(updateAccountSchema))
    { account }: UpdateAccountSchema,
  ) {
    const result = await this.updateAccountUseCase.handle({
      account: {
        id: req.user.sub,
        name: account.name,
        email: account.email,
      },
    });

    if (result.isLeft())
      throw new HttpException(
        {
          code: result.value.code,
          message: result.value.message,
        },
        400,
      );
  }
}
