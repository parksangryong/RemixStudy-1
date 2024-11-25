import { json } from "@remix-run/node";

export async function loader() {
  const data = { key: "value", date: new Date() };
  // const body = JSON.stringify(data);

  return json(data, { status: 200 });
  // return new Response(body, {
  //   headers: {
  //     "Content-Type": "application/json; charset=utf-8",
  //   },
  // });
}

export default function Demo() {
  return <h1>Demo page</h1>;
}
