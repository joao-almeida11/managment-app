import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing seed data
  await prisma.comment.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.user.deleteMany({});

  // --- Users ---
  const users = await prisma.user.createMany({
    data: [
      {
        email: "alice@example.com",
        password: "hashedpassword1",
        name: "Alice Doe",
        image: "https://i.pravatar.cc/150?img=1",
      },
      {
        email: "bob@example.com",
        password: "hashedpassword2",
        name: "Bob Smith",
        image: "https://i.pravatar.cc/150?img=2",
      },
    ],
  });

  // Fetch them with IDs for relations
  const [alice, bob] = await prisma.user.findMany();

  // --- Tasks ---
  const task1 = await prisma.task.create({
    data: {
      title: "Setup development environment",
      description: "Install dependencies, setup .env, and run migrations",
      status: "TO_DO",
      authorId: alice.id,
    },
  });

  const task2 = await prisma.task.create({
    data: {
      title: "Implement login feature",
      description: "Use JWT authentication and secure password hashing",
      status: "IN_PROGRESS",
      authorId: alice.id,
    },
  });

  const task3 = await prisma.task.create({
    data: {
      title: "Review pull request #42",
      description: "Check for consistent naming and test coverage",
      status: "IN_REVIEW",
      authorId: bob.id,
    },
  });

  // --- Comments ---
  await prisma.comment.createMany({
    data: [
      {
        content: "Looks good to me!",
        authorId: bob.id,
        taskId: task2.id,
      },
      {
        content: "Can we refactor this function for clarity?",
        authorId: alice.id,
        taskId: task3.id,
      },
      {
        content: "Added missing tests, ready for merge",
        authorId: bob.id,
        taskId: task3.id,
      },
    ],
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
