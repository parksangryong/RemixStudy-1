export const meta = () => {
  return [
    { title: "Posts page" },
    { name: "description", content: "Welcome to Posts!" },
  ];
};

const posts = [
  {
    id: 1,
    title: "First post",
    url: "/singlePost",
    content:
      "This is the first post. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    date: "2024-01-01",
  },
  {
    id: 2,
    title: "Second post",
    url: "/singlePost",
    content:
      "This is the first post. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    date: "2024-01-01",
  },
  {
    id: 3,
    title: "Third post",
    url: "/singlePost",
    content:
      "This is the first post. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    date: "2024-01-01",
  },
  {
    id: 4,
    title: "Fourth post",
    url: "/singlePost",
    content:
      "This is the first post. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    date: "2024-01-01",
  },
  {
    id: 5,
    title: "Fifth post",
    url: "/singlePost",
    content:
      "This is the first post. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    date: "2024-01-01",
  },
];

export default function Posts() {
  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>
            <a href={post.url}>{post.title}</a>
          </h2>
          <p>
            {post.content.split(" ").slice(0, 20).join(" ")}
            {post.content.split(" ").length > 20 && "..."}
          </p>
          <p>
            {new Date(post.date).toLocaleDateString("kr", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
      ))}
    </>
  );
}
