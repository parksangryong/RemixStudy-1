import { json, useLoaderData } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "Home page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const images = await fetch("https://cataas.com/api/cats?json=true&limit=12", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return json({ images: await images.json() });
}

export default function Index() {
  const images = useLoaderData<typeof loader>();

  return (
    <div
      className="imageBox"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {images.images.map((image: { _id: string }, index: number) => (
        <img
          key={index}
          style={{
            width: "200px",
            height: "200px",
            border: "5px solid #444",
            margin: "10px",
            objectFit: "cover",
          }}
          src={`https://cataas.com/cat/${image._id}`}
          alt="cat"
        />
      ))}
    </div>
  );
}
