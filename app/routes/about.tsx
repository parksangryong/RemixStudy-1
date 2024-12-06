import { json, useLocation } from "@remix-run/react";

export async function loader() {
  return json({ idx: 1 });
}

export default function About() {
  const location = useLocation();
  console.log(location.state);
  console.log(location.hash);
  console.log(location.search);
  console.log(location.pathname);
  return <h1>About page</h1>;
}
