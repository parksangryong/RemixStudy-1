interface PostProps {
  id: number;
  userId: number;
  author: string;
  title: string;
  content: string;
  createdAt: string;
  slug: string;
}

export default function Post({ post }: { post: PostProps }) {
  return (
    <div key={post.id}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>
        {new Date(post.createdAt).toLocaleDateString("kr", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </p>
      <h6>by {post.author}</h6>
    </div>
  );
}
