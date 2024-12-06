import { Form } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";

interface CommentProps {
  id: number;
  userId: number;
  postId: number;
  postSlug: string;
  body: string;
  createdAt: string;
}

type ActionData = {
  errors?: {
    commentBody?: string;
  };
  success?: boolean;
};

export default function Comments({
  comments,
  actionData,
  postId,
  postSlug,
}: {
  comments: CommentProps[];
  actionData: ActionData | undefined;
  postId: number;
  postSlug: string;
}) {
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [savedComment, setSavedComment] = useState<string>("");

  const handleSubmit = () => {
    // 폼 제출 시점에 현재 입력값 저장
    setSavedComment(commentRef.current?.value || "");
    // textarea 비우기
    if (commentRef.current) {
      setTimeout(() => {
        commentRef.current!.value = "";
      }, 100);
    }
  };
  useEffect(() => {
    if (actionData && !actionData.success) {
      if (commentRef.current) {
        commentRef.current.value = savedComment;
      }
      alert("댓글 작성에 실패했습니다. 다시 시도해주세요.");
    }
  }, [actionData]);

  return (
    <section>
      <h2>Comments ({comments.length})</h2>
      <Form method="post" onSubmit={handleSubmit}>
        {actionData?.errors?.commentBody ? (
          <em style={{ color: "red" }}>{actionData?.errors?.commentBody}</em>
        ) : null}
        <textarea
          ref={commentRef}
          name="commentBody"
          rows={4}
          placeholder="Write a comment here..."
        />
        <input type="hidden" name="postId" value={postId} />
        <input type="hidden" name="postSlug" value={postSlug} />
        <button type="submit">Post</button>
      </Form>
      <article>
        {comments.map((comment) => (
          <div
            key={comment.id}
            style={{
              marginBottom: "1rem",
              marginTop: "1rem",
              borderBottom: "1px solid #333",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 1rem",
            }}
          >
            <p>{comment.body}</p>
            <time dateTime={comment.createdAt}>
              {new Date(comment.createdAt).toLocaleDateString("kr", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </time>
          </div>
        ))}
      </article>
    </section>
  );
}
