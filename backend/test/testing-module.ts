import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/infra/app.module';

export class TestingModule {
  private app: INestApplication;

  public async run() {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.app = moduleRef.createNestApplication();
    this.app.setGlobalPrefix('api');
    await this.app.init();

    return this.app;
  }
}
