import { Outlet } from "@remix-run/react";
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
      <Outlet />
    </>
  );
}
