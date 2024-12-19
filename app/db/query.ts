import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type createPostType = {
  userId: number;
  slug: string;
  title: string;
  content: string;
};

type createCommentType = {
  userId: number;
  postId: number;
  postSlug: string;
  body: string;
};

export async function getAllPosts() {
  try {
    return await prisma.post.findMany({
      include: {
        user: true,
        comments: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.log("unexpected error", error);
    return [];
  }
}

export async function getCommentByPostSlug(postSlug: string) {
  try {
    return await prisma.comment.findMany({
      where: { postSlug },
      include: { user: true },
    });
  } catch (error) {
    console.log("unexpected error", error);
    return [];
  }
}

export async function createPost(params: createPostType) {
  try {
    return await prisma.post.create({
      data: params,
    });
  } catch (error) {
    console.log("unexpected error", error);
    return [];
  }
}

export async function createComment(params: createCommentType) {
  try {
    const newComment = await prisma.comment.create({
      data: params,
    });
    console.log("newComment", newComment);
    return { error: false };
  } catch (error) {
    console.log("unexpected error", error);
    return { error: true, errorMessage: error };
  }
}
