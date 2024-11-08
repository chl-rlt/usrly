import { prisma } from "../prisma";
import { seedUsers } from "./users";

void seed()
  .then(() => {
    console.info("Seed completed");
  })
  .catch((error) => {
    console.error("Seed failed");
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });

async function seed() {
  if (process.env.NODE_ENV === "development") {
    await seedUsers();
  }
}
