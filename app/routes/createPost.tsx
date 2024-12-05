import { ActionFunctionArgs, json } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import data from "../../postData.json";
import fs from "fs";
export async function action({ request }: ActionFunctionArgs) {
  //   console.log("action function called");
  const body = await request.formData();
  const title = body.get("title");
  const slug = body.get("slug");
  const userId = body.get("userId");
  const content = body.get("content");

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

  return json({ success: true });
  //   return redirect("/posts");
}

export default function CreatePost() {
  const data = useActionData<typeof action>();
  console.log(data);

  return (
    <div>
      <form method="POST">
        <section>
          <label htmlFor="userId">User ID:</label>
          <input type="number" name="userId" />
        </section>
        <section>
          <label htmlFor="slug">Slug:</label>
          <input type="text" name="slug" />
        </section>
        <section>
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" />
        </section>
        <section>
          <label htmlFor="content">Content:</label>
          <input type="text" name="content" />
        </section>
        <section>
          <button type="submit">Create Post</button>
        </section>
      </form>
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
