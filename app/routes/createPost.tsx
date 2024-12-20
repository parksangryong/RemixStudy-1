import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useActionData, useNavigation } from "@remix-run/react";

// utils
import { countWords, fakeDelay } from "~/utils/helper";

// components
import Spinner from "~/components/helper/Spinner";
import { createPost } from "~/db/query";
import { getSession } from "~/session";

type ActionData = {
  errors?: {
    userId?: string;
    slug?: string;
    title?: string;
    content?: string;
  };
  success?: boolean;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("userId")) {
    return redirect("/login");
  }
  return { success: true };
}

export async function action({ request }: ActionFunctionArgs) {
  await fakeDelay(3000);

  const body = await request.formData();
  const title = body.get("title");
  const slug = body.get("slug");
  const userId = body.get("userId");
  const content = body.get("content");

  const errors: Record<string, string> = {};

  if (!userId || userId == null || userId == "") {
    errors.userId = "Invalid User ID";
  }
  if (!slug || slug == null || slug == "") {
    errors.slug = "Invalid Slug";
  }
  if (
    !title ||
    title == null ||
    title == "" ||
    countWords(title.toString()) < 2
  ) {
    errors.title = "Invalid Title";
  }
  if (
    !content ||
    content == null ||
    content == "" ||
    countWords(content.toString()) < 2
  ) {
    errors.content = "Invalid Content";
  }
  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  try {
    const result = await createPost({
      userId: parseInt(userId as string),
      slug: slug as string,
      title: title as string,
      content: content as string,
    });
    console.log("result", result);
  } catch (error) {
    console.log("unexpected error:", error);
  }

  // return json({ success: true });
  return redirect("/posts");
}

export default function CreatePost() {
  const actionData = useActionData<ActionData>();

  const navigation = useNavigation();

  return (
    <div>
      <Form method="POST">
        <section>
          <label htmlFor="userId">User ID:</label>
          {actionData?.errors?.userId && (
            <em style={{ color: "red" }}>{actionData?.errors?.userId}</em>
          )}
          <input type="number" name="userId" />
        </section>
        <section>
          <label htmlFor="slug">Slug:</label>
          {actionData?.errors?.slug && (
            <em style={{ color: "red" }}>{actionData?.errors?.slug}</em>
          )}
          <input type="text" name="slug" />
        </section>
        <section>
          <label htmlFor="title">Title:</label>
          {actionData?.errors?.title && (
            <em style={{ color: "red" }}>{actionData?.errors?.title}</em>
          )}
          <input type="text" name="title" />
        </section>
        <section>
          <label htmlFor="content">Content:</label>
          {actionData?.errors?.content && (
            <em style={{ color: "red" }}>{actionData?.errors?.content}</em>
          )}
          <input type="text" name="content" lang="ko" />
        </section>
        <section>
          <button
            type="submit"
            style={{
              display: navigation.state === "submitting" ? "none" : "block",
            }}
          >
            Create Post
          </button>
          {navigation.state === "submitting" && <Spinner />}
        </section>
      </Form>
    </div>
  );
}
