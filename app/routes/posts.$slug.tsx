import { useEffect, useState } from "react";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import {
  useActionData,
  useLoaderData,
  useMatches,
  useNavigation,
} from "@remix-run/react";

// components
import Comments from "~/components/Comments";
import Post from "~/components/Post";

// fs
import fs from "fs";

// data
import commentsData from "../../commentData.json";

// utils
import { fakeDelay, formatDate } from "~/utils/helper";

interface PostsData {
  result: Array<PostProps>;
}

interface PostProps {
  id: number;
  userId: number;
  author: string;
  title: string;
  createdAt: string;
  content: string;
  slug: string;
  comments: CommentProps[];
}

interface CommentProps {
  id: number;
  userId: number;
  postId: number;
  postSlug: string;
  body: string;
  createdAt: string;
}

type ActionData = {
  errors?: {
    commentBody?: string;
  };
  success?: boolean;
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  return json({ slug });
}

export async function action({ request }: ActionFunctionArgs) {
  await fakeDelay(2000);

  const body = await request.formData();
  const commentBody = body.get("commentBody");
  const postId = body.get("postId");
  const postSlug = body.get("postSlug");

  const errors: Record<string, string> = {};

  if (!commentBody || commentBody == null || commentBody == "") {
    errors.commentBody = "Invalid Comment Body";
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  const newComment = {
    id: Date.now(),
    userId: 1,
    postId: parseInt(postId as string),
    postSlug: postSlug,
    body: commentBody,
    createdAt: formatDate(),
  };

  const newPosts = [...commentsData, newComment];

  try {
    const filePath =
      "/Users/parksangryong/Desktop/Study/remix/my-remix-app-3/commentData.json";
    fs.writeFileSync(filePath, JSON.stringify(newPosts, null, 2));
    return json({ success: true });
  } catch (error) {
    console.log("unexpected error:", error);
    return json({ success: false });
  }
}

export default function SinglePost() {
  const { slug } = useLoaderData<typeof loader>();
  const matches = useMatches();
  const postsData = matches.find((match) => match.id === "routes/posts")
    ?.data as PostsData;
  const post = postsData?.result.find((post) => post.slug === slug);
  console.log("post", post);

  const postComments = post?.comments || [];

  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const [comments, setComments] = useState<CommentProps[]>(postComments);

  useEffect(() => {
    if (navigation.formData && navigation.formData.get("commentBody")) {
      const newComment = {
        id: Date.now(),
        userId: 1,
        postId: parseInt(navigation.formData.get("postId") as string),
        postSlug: navigation.formData.get("postSlug") as string,
        body: navigation.formData.get("commentBody") as string,
        createdAt: formatDate(),
      };
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation.formData]);

  useEffect(() => {
    if (actionData && !actionData.success) {
      setComments(postComments);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  if (!post) return null;

  return (
    <>
      <Post post={post} />
      <Comments
        comments={comments}
        actionData={actionData}
        postId={post.id}
        postSlug={post.slug}
      />
    </>
  );
}
