import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient({ adapter });
}

const prisma = new PrismaClient({ adapter });

export default prisma;
