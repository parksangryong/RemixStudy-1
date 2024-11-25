interface PostProps {
  id: number;
  title: string;
  url: string;
  content: string;
  date: string;
}

export default function PostsList({ posts }: { posts: PostProps[] }) {
  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="blog-post">
          <h2 className="blog-post-title">
            <a href={post.url}>{post.title}</a>
          </h2>
          <p className="blog-post-content">
            {post.content.split(" ").slice(0, 20).join(" ")}
            {post.content.split(" ").length > 20 && "..."}
          </p>
          <p className="blog-post-date">
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
