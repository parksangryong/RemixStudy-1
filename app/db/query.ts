import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllPosts() {
  try {
    return await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
      },
    });
  } catch (error) {
    console.log("unexpected error", error);
    return [];
  }
}
