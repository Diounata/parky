import { Encrypter } from '@/application/cryptography/encrypter';
import { DatabaseModule } from '@/infra/database/database.module';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AccountFactory } from 'test/factories/make-account';
import { TestingModule } from 'test/testing-module';

describe('[E2E] Get authenticated account', () => {
  let app: INestApplication;
  let jwtEncrypter: Encrypter;
  let accountFactory: AccountFactory;

  beforeEach(async () => {
    app = await new TestingModule().run({
      imports: [DatabaseModule],
      providers: [AccountFactory],
    });
    jwtEncrypter = app.get(Encrypter);
    accountFactory = app.get(AccountFactory);
  });

  test('[GET] /queries/accounts/get-authenticated-account', async () => {
    const account = await accountFactory.makePrismaAccount();
    const accessToken = await jwtEncrypter.encrypt({
      sub: account.getId(),
    });

    const response = await request(app.getHttpServer())
      .get('/api/queries/accounts/get-authenticated-account')
      .set('Cookie', `auth-jwt-token=${accessToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      account: expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
      }),
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
