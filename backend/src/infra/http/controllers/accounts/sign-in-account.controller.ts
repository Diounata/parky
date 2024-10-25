import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
} from '@nestjs/common';
import { SignInAccountUseCase } from 'src/application/use-cases/accounts/sign-in-account';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';

const signInAccountSchema = z.object({
  account: z.object({
    email: z.string().email(),
    rawPassword: z.string().min(6),
  }),
});

type SignInAccountSchema = z.infer<typeof signInAccountSchema>;

@Controller('accounts')
export class SignInAccountController {
  constructor(private signInAccountUseCase: SignInAccountUseCase) {}

  @Post('sign-in')
  @HttpCode(200)
  async handle(
    @Body(new ZodValidationPipe(signInAccountSchema))
    { account }: SignInAccountSchema,
  ) {
    const result = await this.signInAccountUseCase.handle({
      account: {
        email: account.email,
        rawPassword: account.rawPassword,
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

    return { accessToken: result.value.accessToken };
  }
}
