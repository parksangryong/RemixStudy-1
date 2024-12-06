import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, redirect, useActionData, useNavigation } from "@remix-run/react";
import data from "../../postData.json";
import fs from "fs";

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

function formatDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
  const timezoneOffset = date.getTimezoneOffset();
  const timezoneOffsetSign = timezoneOffset > 0 ? "-" : "+";
  const timezoneOffsetHours = Math.abs(Math.floor(timezoneOffset / 60));
  const timezoneOffsetMinutes = Math.abs(timezoneOffset % 60);

  return `${year}-${month}-${day} ${hour}:${minute}:${second}.${milliseconds}${timezoneOffsetSign}${timezoneOffsetHours}${timezoneOffsetMinutes}`;
}

function countWords(str: string) {
  const wordsArray = str.split(/\s+/);
  const filteredArray = wordsArray.filter((word) => word.trim() !== "");
  return filteredArray.length;
}

function fakeDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
