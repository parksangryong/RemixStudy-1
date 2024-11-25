interface PostProps {
  id: number;
  userId: number;
  author: string;
  title: string;
  createdAt: string;
  content: string;
  slug: string;
}

export default function PostsList({ posts }: { posts: PostProps[] }) {
  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>
            <a href={`/posts/${post.slug}`}>{post.title}</a>
          </h2>
          <p>
            {post.content.split(" ").slice(0, 20).join(" ")}
            {post.content.split(" ").length > 20 && "..."}
          </p>
          <p>
            {new Date(post.createdAt).toLocaleDateString("kr", {
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
