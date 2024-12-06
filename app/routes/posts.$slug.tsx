import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { useActionData, useLoaderData, useMatches } from "@remix-run/react";
import Comments from "~/components/\bComments";
import Post from "~/components/Post";
import fs from "fs";

import commentsData from "../../commentData.json";

interface PostProps {
  id: number;
  userId: number;
  author: string;
  title: string;
  createdAt: string;
  content: string;
  slug: string;
}

type ActionData = {
  errors?: {
    commentBody?: string;
  };
  success?: boolean;
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  const currentPostComments = commentsData.filter(
    (item) => item.postSlug === slug
  );
  return json({ slug, postComments: currentPostComments });
}

export async function action({ request }: ActionFunctionArgs) {
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
  } catch (error) {
    console.log("unexpected error:", error);
  }

  // return json({ success: true });
  // return redirect("/posts");

  return json({ success: true });
}

export default function SinglePost() {
  const { slug, postComments } = useLoaderData<typeof loader>();
  const matches = useMatches();
  const posts = matches[1].data as PostProps[];
  const post = posts.find((post) => post.slug === slug);

  const actionData = useActionData<ActionData>();

  if (!post) return null;

  return (
    <>
      <Post post={post} />
      <Comments
        comments={postComments}
        actionData={actionData}
        postId={post.id}
        postSlug={post.slug}
      />
    </>
  );
}

function formatDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
  const timezoneOffset = date.getTimezoneOffset();
  const timezoneOffsetSign = timezoneOffset > 0 ? "-" : "+";
  const timezoneOffsetHours = Math.abs(Math.floor(timezoneOffset / 60));
  const timezoneOffsetMinutes = Math.abs(timezoneOffset % 60);

  return `${year}-${month}-${day} ${hour}:${minute}:${second}.${milliseconds}${timezoneOffsetSign}${timezoneOffsetHours}${timezoneOffsetMinutes}`;
}
