import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "demo@example.com";
  const password = "DemoPassword123";

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    console.log("Demo user already exists.");
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
    },
  });

  console.log("Demo user created:");
  console.log("Email:", email);
  console.log("Password:", password);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
