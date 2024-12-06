import { useMatches } from "@remix-run/react";

// components
import PostsList from "~/components/PostsList";

interface PostProps {
  id: number;
  userId: number;
  author: string;
  title: string;
  createdAt: string;
  content: string;
  slug: string;
}

export default function PostsIndex() {
  const matches = useMatches();
  const posts = matches[1].data as PostProps[];

  return <PostsList posts={posts} />;
}
