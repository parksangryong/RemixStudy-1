import { Outlet } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "Posts page" },
    { name: "description", content: "Welcome to Posts!" },
  ];
};

export default function Posts() {
  return (
    <>
      <Outlet />
    </>
  );
}
