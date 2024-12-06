import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, redirect, useActionData, useNavigation } from "@remix-run/react";
import data from "../../postData.json";
import fs from "fs";
import { countWords, fakeDelay, formatDate } from "~/utils/helper";

type ActionData = {
  errors?: {
    userId?: string;
    slug?: string;
    title?: string;
    content?: string;
  };
  success?: boolean;
};

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

  const author = "John Doe";
  const createdAt = formatDate();
  const id = 6;

  const newPost = {
    id,
    userId: parseInt(userId as string),
    author,
    title,
    createdAt,
    content,
    slug,
  };
  const newPosts = [...data, newPost];

  try {
    const filePath =
      "/Users/parksangryong/Desktop/Study/remix/my-remix-app-3/postData.json";
    fs.writeFileSync(filePath, JSON.stringify(newPosts, null, 2));
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
          <input type="text" name="content" />
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

export function Spinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "4px solid rgba(0,0,0,0.1)",
          borderTopColor: "#333",
          animation: "spin 1s linear infinite",
        }}
      />
      <style>
        {`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        `}
      </style>
    </div>
  );
}
