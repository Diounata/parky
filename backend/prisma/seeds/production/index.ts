import { PrismaClient } from '@prisma/client';
import { seedProductionAccounts } from './accounts';

export async function seedProductionEnvironment() {
  const prisma = new PrismaClient();
  await prisma.account.createMany({ data: await seedProductionAccounts() });
}
