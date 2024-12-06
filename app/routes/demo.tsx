import { Form, json, useLoaderData, useNavigation } from "@remix-run/react";
import { fakeDelay } from "~/utils/helper";

let fruits: string[] = [];

export async function loader() {
  return fruits;
}

export async function action({ request }: { request: Request }) {
  const body = await request.formData();
  const _action = body.get("_action");
  if (_action === "create") {
    const addFruit = body.get("addFruit");
    fruits = [...fruits, addFruit as string];
  } else if (_action === "delete") {
    await fakeDelay(1000);
    const fruitName = body.get("fruitName");
    const index = fruits.findIndex((fruit) => fruit === fruitName);
    if (index !== -1) {
      fruits.splice(index, 1);
    }
  }

  return json({ success: true });
}

export default function Demo() {
  const fruits = useLoaderData<typeof loader>();

  return (
    <>
      <section>
        <ul>
          {fruits.map((item, index) => {
            return <FruitItem key={index} index={index} item={item} />;
          })}
        </ul>
      </section>
      <section>
        <Form method="POST">
          <input type="text" name="addFruit" placeholder="Add a fruit" />
          <button type="submit" name="_action" value="create">
            Add
          </button>
        </Form>
      </section>
    </>
  );
}

export function FruitItem({ index, item }: { index: number; item: string }) {
  const navigation = useNavigation();

  return (
    <li
      key={index}
      style={{
        opacity: navigation?.formData?.get("fruitName") === item ? 0.25 : 1,
        backgroundColor:
          navigation?.formData?.get("fruitName") === item ? "red" : "white",
      }}
    >
      <div className="grid">
        <p>{item}</p>
        <Form method="POST">
          <input type="hidden" name="fruitName" value={item} />
          <button
            type="submit"
            style={{ width: "50px" }}
            name="_action"
            value="delete"
          >
            X
          </button>
        </Form>
      </div>
    </li>
  );
}
