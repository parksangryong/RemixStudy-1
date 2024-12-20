import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  json,
  redirect,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { deletePost, getMyPosts } from "~/db/query";
import { getSession } from "~/session";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("userId")) {
    return redirect("/login");
  }

  const userId = 1;
  const result = await getMyPosts(userId);

  if (result.error) {
    return [];
  } else {
    return result.posts;
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const deleteId = body.get("deleteId");
  const result = await deletePost(Number(deleteId));

  return json({ error: result.error, errorMessage: result.errorMessage });
}

export default function MyPosts() {
  const posts = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const handleEdit = (id: number) => {
    navigate("/editpost/" + id);
  };

  const handleDelete = (id: number) => {
    fetcher.submit({ deleteId: id }, { method: "post" });
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts &&
            posts.length > 0 &&
            posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>
                  <div role="group">
                    <button onClick={() => handleEdit(post.id)}>Edit</button>
                    <button onClick={() => handleDelete(post.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
