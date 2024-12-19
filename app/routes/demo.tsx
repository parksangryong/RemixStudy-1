import { json } from "@remix-run/node";
import { getAllPosts } from "~/db/query";

export async function loader() {
  const result = await getAllPosts();
  console.log("result", result[0]);
  console.log("resultUser", result[0].user);
  console.log("resultComments", result[0].comments);
  return json({ success: true });
}

export default function Demo() {
  return (
    <>
      <section></section>
    </>
  );
}
