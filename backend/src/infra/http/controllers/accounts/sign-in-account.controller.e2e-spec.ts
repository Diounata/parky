import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TestingModule } from 'test/testing-module';

describe('[Controller] Sign in account', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await new TestingModule().run();
  });

  test('[POST] /accounts/sign-in', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/accounts/sign-in')
      .send({
        account: {
          email: 'johndoe@email.com',
          rawPassword: '123456',
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
