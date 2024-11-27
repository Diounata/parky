import { Account } from '@prisma/client';

export async function seedProductionAccounts() {
  const accounts = <Account[]>[
    {
      name: 'Jonatham Luz',
      email: 'jonatham.luz@gmail.com',
      passwordHash: 'jonatham123',
      passwordType: 'plain',
      createdAt: new Date(),
      updatedAt: null,
    },
  ];

  return accounts;
}
