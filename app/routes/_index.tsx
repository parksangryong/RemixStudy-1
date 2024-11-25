import { useNavigate } from "@remix-run/react";

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
    <div className="btn">
      <button type="button" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
}
