import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      email: "user1@example.com",
      password: "password1",
      name: "User 1",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "user2@example.com",
      password: "password2",
      name: "User 2",
    },
  });

  const post1 = await prisma.post.create({
    data: {
      title: "Hello World 1",
      content: "This is the first post",
      slug: "hello-world-1",
      userId: user1.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: "Hello World 2",
      content: "This is the second post",
      slug: "hello-world-2",
      userId: user2.id,
    },
  });

  await prisma.comment.create({
    data: {
      body: "This is the first comment",
      postId: post1.id,
      userId: user1.id,
      postSlug: post1.slug,
    },
  });
  await prisma.comment.create({
    data: {
      body: "This is the second comment",
      postId: post2.id,
      userId: user2.id,
      postSlug: post2.slug,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
