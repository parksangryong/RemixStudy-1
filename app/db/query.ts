import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type createPostType = {
  userId: number;
  slug: string;
  title: string;
  content: string;
};

type updatePostType = {
  id: number;
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
    return { error: false, newComment };
  } catch (error) {
    console.log("unexpected error", error);
    return { error: true, errorMessage: error };
  }
}

export async function getPostById(id: number) {
  try {
    const post = await prisma.post.findUnique({ where: { id } });
    return { error: false, post };
  } catch (error) {
    console.log("unexpected error", error);
    return { error: true, errorMessage: error };
  }
}

export async function updatePost(params: updatePostType) {
  try {
    return await prisma.post.update({
      where: { id: params.id },
      data: {
        title: params.title,
        content: params.content,
      },
    });
  } catch (error) {
    console.log("unexpected error", error);
    return [];
  }
}

export async function getMyPosts(userId: number) {
  try {
    const posts = await prisma.post.findMany({ where: { userId } });
    return { error: false, posts };
  } catch (error) {
    console.log("unexpected error", error);
    return { error: true, errorMessage: error };
  }
}

export async function deletePost(postId: number) {
  try {
    const deleteComments = await prisma.comment.deleteMany({
      where: { postId },
    });
    const deletePost = await prisma.post.delete({ where: { id: postId } });
    return { error: false, deletePost, deleteComments };
  } catch (error) {
    console.log("unexpected error", error);
    return { error: true, errorMessage: error };
  }
}

export async function createUser(
  email: string,
  password: string,
  name: string
) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return {
        error: true,
        errorMessage: "User with same email exists. Please login.",
      };
    } else {
      const newUser = await prisma.user.create({
        data: {
          email,
          password,
          name,
        },
      });
      console.log(newUser);

      return { error: false, errorMessage: "" };
    }
  } catch (error: unknown | Error) {
    console.log(`Unexpected error ${error}`);
    return { error: true, errorMessage: `Unexpected error` };
  }
}
