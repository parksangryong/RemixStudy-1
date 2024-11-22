import { Link, useNavigate } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "Home page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const navigate = useNavigate();

  const handleClick = () => {
    //navigate("/posts")
    navigate({
      pathname: "/posts",
      search: "?query=string",
      hash: "#hash",
    });
  };

  return (
    <>
      <a href="/posts">Posts via a tag</a>
      <br />
      <Link to="/posts" reloadDocument>
        Posts via Link component
      </Link>
      <br />
      <Link
        to={{
          pathname: "/posts",
          search: "?query=string",
          hash: "#hash",
        }}
      >
        Posts
      </Link>

      <br />

      <Link to="/posts" prefetch="intent">
        Posts
      </Link>

      <br />

      <Link to="/posts">Posts</Link>

      <br />

      <button onClick={handleClick}>Submit</button>
    </>
  );
}
