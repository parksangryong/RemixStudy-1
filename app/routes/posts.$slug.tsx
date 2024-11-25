import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import postData from "../../postData.json";
import Post from "~/components/Post";

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  const post = postData.find((item) => item.slug === slug);
  return post;
}

export default function SinglePost() {
  const post = useLoaderData<typeof loader>();

  if (!post) return null;

  return <Post post={post} />;
}
