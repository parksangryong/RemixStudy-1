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
  const postsData = matches.find((match) => match.id === "routes/posts")
    ?.data as PostProps[];
  const posts = postsData || [];

  return <PostsList posts={posts} />;
}
