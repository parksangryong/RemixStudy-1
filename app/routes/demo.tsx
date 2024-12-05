import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log(formData);

  await fakeDelay(1500);

  return json({ success: true });
}

export default function Demo() {
  const data = useActionData<typeof action>();
  console.log("actionData: ", data?.success);

  const [count, setCount] = useState(0);

  const ButtonBox = () => (
    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
      <button
        style={{ width: "200px" }}
        type="submit"
        onClick={() => setCount(count + 1)}
      >
        Increase
      </button>
      <button
        style={{ width: "200px" }}
        type="submit"
        onClick={() => setCount(count - 1)}
      >
        Decrease
      </button>
    </div>
  );

  return (
    <>
      <h2 style={{ color: "green" }}>Count: {count}</h2>
      <h3>HTML form</h3>
      <form method="post">
        <ButtonBox />
        <button type="submit">Create</button>
      </form>
      <h3>Remix Form Component</h3>
      <Form method="post">
        <ButtonBox />
        <button type="submit">Create</button>
      </Form>
    </>
  );
}

function fakeDelay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
