import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TestingModule } from 'test/testing-module';

describe('[Controller] Sign up account', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await new TestingModule().run();
  });

  test('[POST] /accounts/sign-up', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/accounts/sign-up')
      .send({
        account: {
          name: 'User',
          email: 'user@email.com',
          rawPassword: '123456',
        },
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({
      accessToken: expect.any(String),
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
