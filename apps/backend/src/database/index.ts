import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['info', 'warn', 'error'],
});

export async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log('Successfully connected to Postgres Database via Prisma.');
  } catch (error) {
    console.error('Failed to connect to Postgres Database:', error);
    process.exit(1);
  }
}
