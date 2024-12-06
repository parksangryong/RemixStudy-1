import { Link, Outlet } from "@remix-run/react";

// data
import postData from "../../postData.json";

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
