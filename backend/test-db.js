import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Insert a test food log
  await prisma.foodLog.create({
    data: {
      user_id: "testuser123",
      food_name: "Banana",
      calories: 105,
      protein: 1,
      carbs: 27,
      fats: 0,
    },
  });

  // Fetch and print all logs
  const logs = await prisma.foodLog.findMany();
  console.log(logs);
}

main()
  .catch((e) => {
    console.error("❌ Prisma error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
