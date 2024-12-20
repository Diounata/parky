import { INestApplication, ModuleMetadata } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/infra/app.module';

export class TestingModule {
  private app: INestApplication;

  public async run({ imports = [], ...metadata }: ModuleMetadata = {}) {
    const moduleRef = await Test.createTestingModule({
      imports: [...imports, AppModule],
      ...metadata,
    }).compile();

    this.app = moduleRef.createNestApplication();
    this.app.setGlobalPrefix('api');
    await this.app.init();

    return this.app;
  }
}
