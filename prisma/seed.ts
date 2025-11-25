import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const adminPass = await bcrypt.hash("123456", 10);
  const testPass = await bcrypt.hash("123456", 10);
  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: { username: "admin", password: adminPass, role: "ADMIN", ratio: 100 }
  });
  await prisma.user.upsert({
    where: { username: "test1" },
    update: {},
    create: { username: "test1", password: testPass, role: "SUB", ratio: 75 }
  });
  await prisma.user.upsert({
    where: { username: "test2" },
    update: {},
    create: { username: "test2", password: testPass, role: "SUB", ratio: 80 }
  });
  console.log("Seed done");
}

main().catch(e=>{ console.error(e); process.exit(1); }).finally(()=>prisma.$disconnect());
