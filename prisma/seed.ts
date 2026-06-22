import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const categories = [
  "Electronics",
  "Fashion",
  "Books",
  "Sports",
  "Home",
  "Beauty",
  "Toys"
];

async function main() {
  console.log("Starting seed...");

  const BATCH_SIZE = 5000;
  const TOTAL = 200000;

  for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
    const products = [];

    for (let j = 0; j < BATCH_SIZE; j++) {
      const createdAt = faker.date.past();

      products.push({
        name: faker.commerce.productName(),
        category: faker.helpers.arrayElement(categories),
        price: faker.commerce.price({
          min: 100,
          max: 100000
        }),
        createdAt,
        updatedAt: faker.date.between({
          from: createdAt,
          to: new Date()
        })
      });
    }

    await prisma.product.createMany({
      data: products
    });

    console.log(`Inserted ${i + BATCH_SIZE}`);
  }

  console.log("Finished seeding");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });