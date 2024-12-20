import { DatabaseModule } from '@/infra/database/database.module';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AccountFactory } from 'test/factories/make-account';
import { TestingModule } from 'test/testing-module';

describe('[E2E] Sign in account', () => {
  let app: INestApplication;
  let accountFactory: AccountFactory;

  beforeEach(async () => {
    app = await new TestingModule().run({
      imports: [DatabaseModule],
      providers: [AccountFactory],
    });
    accountFactory = app.get(AccountFactory);
  });

  test('[POST] /accounts/sign-in', async () => {
    await accountFactory.makePrismaAccount({
      email: 'user@email.com',
      password: 'user123',
      passwordType: 'plain',
    });

    const response = await request(app.getHttpServer())
      .post('/api/accounts/sign-in')
      .send({
        account: {
          email: 'user@email.com',
          rawPassword: 'user123',
        },
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      accessToken: expect.any(String),
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
