import { Encrypter } from '@/application/cryptography/encrypter';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AccountFactory } from 'test/factories/make-account';
import { TestingModule } from 'test/testing-module';

describe('[E2E] Update authenticated account', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let accountFactory: AccountFactory;
  let jwtEncrypter: Encrypter;

  beforeEach(async () => {
    app = await new TestingModule().run({
      imports: [DatabaseModule],
      providers: [AccountFactory],
    });
    prisma = app.get(PrismaService);
    accountFactory = app.get(AccountFactory);
    jwtEncrypter = app.get(Encrypter);
  });

  test('[POST] /accounts/update-authenticated-account', async () => {
    const account = await accountFactory.makePrismaAccount();
    const updatedAccountEmail = 'updated-email@email.com';
    const accessToken = await jwtEncrypter.encrypt({
      sub: account.getId(),
    });

    const response = await request(app.getHttpServer())
      .put('/api/accounts/update-authenticated-account')
      .set('Cookie', `auth-jwt-token=${accessToken}`)
      .send({
        account: {
          name: account.getName(),
          email: updatedAccountEmail,
        },
      });

    expect(response.statusCode).toBe(200);
    expect(
      await prisma.account.findUnique({
        where: {
          email: updatedAccountEmail,
        },
      }),
    ).toBeTruthy();
  });

  afterEach(async () => {
    await app.close();
  });
});
