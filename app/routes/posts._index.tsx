import { useMatches } from "@remix-run/react";

// components
import PostsList from "~/components/PostsList";

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
}

export default function PostsIndex() {
  const matches = useMatches();
  const postsData = matches.find((match) => match.id === "routes/posts")
    ?.data as PostsData;
  const posts = postsData?.result || [];

  return <PostsList posts={posts} />;
}
