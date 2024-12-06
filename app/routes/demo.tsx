import { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const slug = body.get("slug");
  console.log(slug);
  return slug;
}

export default function Demo() {
  return (
    <>
      <h1>Demo</h1>
      <Form method="POST">
        <input type="text" name="slug" />
        <button type="submit">Create</button>
      </Form>
    </>
  );
}

// function fakeDelay(time: number) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, time); // 3 seconds delay
//   });
// }
