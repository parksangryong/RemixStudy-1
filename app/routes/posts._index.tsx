import { useLoaderData } from "@remix-run/react";
import PostsList from "~/components/PostsList";
import postData from "../../postData.json";

export async function loader() {
  return postData;
}

export default function PostsIndex() {
  const posts = useLoaderData<typeof loader>();
  return <PostsList posts={posts} />;
}
