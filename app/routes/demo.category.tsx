import { Form, Outlet, json } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";

export async function loader() {
  console.log("/demo/category router loader called");
  return json({ success: true });
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("/demo/category router action called");
  console.log(await request.formData());
  return json({ success: true });
}

export default function DemoCategory() {
  return (
    <>
      <Outlet />
      <h1>/demo/category route</h1>

      <Form method="POST">
        <p>
          <input type="text" name="slug" />
        </p>
        <button type="submit">Create</button>
      </Form>
    </>
  );
}
