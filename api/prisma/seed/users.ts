import { prisma } from "../prisma";
import { Faker, faker } from "@faker-js/faker";
import { initialize, defineUserFactory } from ".prisma-fabbrica";
import bcrypt from "bcryptjs";
import { hashPassword } from "../../src/utils";

export async function seedUsers() {
  initialize({ prisma });
  const alreadySeeded = await prisma.user.findFirst().then(Boolean);

  if (alreadySeeded) {
    console.info("Skipping : Database already seeded");
    return;
  }

  const cryptedFakerPassword = await hashPassword(faker.internet.password());

  const UserFactory = defineUserFactory({
    defaultData: async () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email({ firstName, lastName });
      const password = await hashPassword(faker.internet.password());
      const birthDate = faker.date.birthdate({
        mode: "year",
        min: 1960,
        max: 2000,
      });
      return { firstName, lastName, email, birthDate, password };
    },
  });

  await UserFactory.createList(30);
}
