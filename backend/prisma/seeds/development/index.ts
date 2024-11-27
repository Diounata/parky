import { PrismaClient } from '@prisma/client';
import { seedDevelopmentAccounts } from './accounts';

export async function seedDevelopmentEnvironment() {
  const prisma = new PrismaClient();
  await prisma.account.createMany({ data: await seedDevelopmentAccounts() });
}
