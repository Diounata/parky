import { seedDevelopmentEnvironment } from './seeds/development';
import { seedProductionEnvironment } from './seeds/production';

async function seed() {
  const environment = process.env.NODE_ENV;
  if (environment === 'development') return await seedDevelopmentEnvironment();
  if (environment === 'production') return await seedProductionEnvironment();
}

seed();
