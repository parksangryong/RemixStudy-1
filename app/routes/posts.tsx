import { useLoaderData } from "@remix-run/react";
import postData from "../../postData.json";
import PostsList from "~/components/PostsList";

export const meta = () => {
  return [
    { title: "Posts page" },
    { name: "description", content: "Welcome to Posts!" },
  ];
};

export async function loader() {
  return postData;
}

export default function Posts() {
  const posts = useLoaderData<typeof loader>();

  return <PostsList posts={posts} />;
}
