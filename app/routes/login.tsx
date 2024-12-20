import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, redirect } from "@remix-run/react";
import { useState } from "react";
import { createUser, loginUser } from "~/db/query";
import { commitSession, getSession } from "~/session";

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData();
  const _action = body.get("_action");

  if (_action === "signup") {
    const name = body.get("name");
    const email = body.get("email");
    const password = body.get("password");

    const result = await createUser(
      name as string,
      email as string,
      password as string
    );
    if (result.error) {
      return json({ success: false, errorMessage: result.errorMessage });
    } else {
      const session = await getSession(request.headers.get("Cookie"));
      session.set("userId", result?.newUser?.id.toString() ?? "");
      session.set("userName", result?.newUser?.name ?? "");

      return redirect("/posts", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
  } else if (_action === "login") {
    const email = body.get("email");
    const password = body.get("password");

    const result = await loginUser(email as string, password as string);
    if (result.error) {
      return json({ success: false, errorMessage: result.errorMessage });
    } else {
      const session = await getSession(request.headers.get("Cookie"));
      session.set("userId", result.user?.id.toString() ?? "");
      session.set("userName", result.user?.name ?? "");

      return redirect("/posts", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
  } else {
    return json({ success: false });
  }
};

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <>
      <section>
        <div>
          <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
          <Form method="post">
            {isSignUp && (
              <div>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" />
              </div>
            )}
            <div>
              <label htmlFor="email">Email: </label>
              <input type="text" name="email" id="email" />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input type="password" name="password" id="password" />
            </div>
            <button
              type="submit"
              name="_action"
              value={isSignUp ? "signup" : "login"}
            >
              {isSignUp ? "Sign Up" : "Login"}
            </button>
            <p>
              {isSignUp ? "Already an member?" : "Not a member?"}
              <button
                type="button"
                className="inline-text-button"
                onClick={toggleSignUp}
              >
                {isSignUp ? "Login" : "Sign Up"}
              </button>
            </p>
          </Form>
        </div>
      </section>
    </>
  );
}
