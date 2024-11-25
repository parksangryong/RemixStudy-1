import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useMatches } from "@remix-run/react";
import Post from "~/components/Post";

interface PostProps {
  id: number;
  userId: number;
  author: string;
  title: string;
  createdAt: string;
  content: string;
  slug: string;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  return slug;
}

export default function SinglePost() {
  const slug = useLoaderData<typeof loader>();
  const matches = useMatches();
  const posts = matches[1].data as PostProps[];
  const post = posts.find((post) => post.slug === slug);

  if (!post) return null;

  return <Post post={post} />;
}
