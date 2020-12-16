import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as faker from 'faker';

const prisma = new PrismaClient();

async function main() {
  dotenv.config({
    path: './.env',
  });
  console.log('Seeding...');
  await prisma.$connect();
  for (let i = 0; i <= 1000; i += 1) {
    console.log('Creating');
    await prisma.user.create({
      data: {
        id: faker.random.uuid(),
        accountType: i % 2 ? 'Admin' : 'User',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(
          `${faker.name.firstName()}${i}`,
          `${faker.name.lastName()}${i}`,
        ),
        password: faker.internet.password(),
        token: faker.internet.password(),
      },
    });
    console.log('Seeding Complete...');
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
