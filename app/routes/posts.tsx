import { LoaderFunctionArgs } from "@remix-run/node";
import { json, Link, Outlet, redirect } from "@remix-run/react";

// data
// import postData from "../../postData.json";
import { getAllPosts } from "~/db/query";
import { getSession } from "~/session";
export const meta = () => {
  return [
    { title: "Posts page" },
    { name: "description", content: "Welcome to Posts!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("userId")) {
    return redirect("/login");
  }

  const posts = await getAllPosts();
  return json(posts);
}

export default function Posts() {
  return (
    <>
      <Link
        to="/createPost"
        style={{
          border: "1px solid skyblue",
          textDecoration: "none",
          borderRadius: "10px",
          padding: "20px",
          position: "fixed",
          bottom: "30px",
          right: "30px",
        }}
      >
        Create Post
      </Link>
      <Outlet />
    </>
  );
}
