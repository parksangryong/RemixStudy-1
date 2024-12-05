import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const slug = formData.get("slug");
  console.log(slug);

  await fakeDelay(3000);

  return json({ success: true });
}

export default function Demo() {
  const data = useActionData<typeof action>();
  console.log("actionData: ", data?.success);

  return (
    <>
      <h1>HTML form</h1>
      <form method="post">
        <p>
          <input type="text" name="slug" />
        </p>
        <button type="submit">Create</button>
      </form>
      <h1>Remix Form Component</h1>
      <Form method="post">
        <p>
          <input type="text" name="slug" />
        </p>
        <button type="submit">Create</button>
      </Form>
    </>
  );
}

function fakeDelay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
