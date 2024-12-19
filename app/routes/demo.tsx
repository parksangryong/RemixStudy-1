import { json } from "@remix-run/node";
import { getCommentByPostSlug } from "~/db/query";

export async function loader() {
  const result = await getCommentByPostSlug("hello-world-1");
  console.log("result", result);
  return json({ success: true });
}

export default function Demo() {
  return (
    <>
      <section></section>
    </>
  );
}
