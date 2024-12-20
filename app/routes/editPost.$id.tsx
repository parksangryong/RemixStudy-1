import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  json,
  redirect,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { useState } from "react";
import Spinner from "~/components/helper/Spinner";
import { getPostById, updatePost } from "~/db/query";
import { getSession } from "~/session";

type Post = {
  userId: number;
  slug: string;
  title: string;
  content: string;
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("userId")) {
    return redirect("/login");
  }

  const postId = params.id;
  const result = await getPostById(Number(postId));

  if (result.error) {
    return {};
  } else {
    return result.post;
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const userId = body.get("userId");
  const title = body.get("title");
  const content = body.get("content");

  const errors: Record<string, string> = {};

  if (!title || title == null || title == "") {
    errors.title = "Invalid Title";
  }

  if (!content || content == null || content == "") {
    errors.content = "Invalid Content";
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  try {
    await updatePost({
      id: parseInt(userId as string),
      title: title as string,
      content: content as string,
    });
    return redirect("/posts");
  } catch (error) {
    console.log("unexpected error", error);
    return json({ success: false });
  }
}

export default function EditPost() {
  const post = useLoaderData<Post>();

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);

  const navigation = useNavigation();

  return (
    <div>
      <Form method="post">
        <input type="hidden" name="userId" value={post?.userId} />

        <section>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </section>
        <section>
          <label htmlFor="content">Content</label>
          <input
            type="text"
            name="content"
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
          />
        </section>
        <section>
          <button
            type="submit"
            style={{
              display: navigation.state === "submitting" ? "none" : "block",
            }}
          >
            editPost
          </button>
          {navigation.state === "submitting" && <Spinner />}
        </section>
      </Form>
    </div>
  );
}
