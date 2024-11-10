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

  const UserFactory = defineUserFactory({
    defaultData: async () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email({ firstName, lastName });
      const password = await hashPassword(
        faker.internet.password({
          length: 10,
        })
      );
      const birthDate = faker.date.birthdate({
        mode: "year",
        min: 1960,
        max: 2000,
      });
      return { firstName, lastName, email, birthDate, password };
    },
  });

  // create dev user
  await UserFactory.create({
    email: "dev@example.com",
    password: await hashPassword("dev123"),
    firstName: "Dev",
    lastName: "User",
  });

  await UserFactory.createList(30);
}
