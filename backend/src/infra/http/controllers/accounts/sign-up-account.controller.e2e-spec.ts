import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TestingModule } from 'test/testing-module';

describe('[E2E] Sign up account', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    app = await new TestingModule().run();
    prisma = app.get(PrismaService);
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
    expect(
      await prisma.account.findUnique({
        where: {
          email: 'user@email.com',
        },
      }),
    ).toBeTruthy();
  });

  afterEach(async () => {
    await app.close();
  });
});
