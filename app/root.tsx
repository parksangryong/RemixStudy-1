import {
  isRouteErrorResponse,
  // Form,
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

// styles
import styles from "./style.css?url";
// import bootstrap from "./bootstrap.css?url";
import picoCSS from "./pico.css?url";
// import tailwind from "./tailwind.css?url";

//components
import Brand from "./components/Brand";
import Navbar from "./components/Navbar";
import { getSession } from "./session";

export const links: LinksFunction = () => [
  // { rel: "stylesheet", href: bootstrap },
  { rel: "stylesheet", href: picoCSS },
  // { rel: "stylesheet", href: tailwind },
  { rel: "stylesheet", href: styles },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("userId")) {
    return json({ isLoggedIn: true });
  }
  return json({ isLoggedIn: false });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <Navbar isLoggedIn={isLoggedIn} />
          <Brand />
        </header>
        <main className="container">{children}</main>
        <footer>
          {/* <h1>/Root route</h1>

          <Form method="POST">
            <p>
              <input type="text" name="slug" />
            </p>
            <button type="submit">Create</button>
          </Form> */}
        </footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError() as Error;

  if (isRouteErrorResponse(error)) {
    return (
      <div style={errorStyles.container}>
        <h1 style={errorStyles.title}>
          {error.status} {error.statusText}
        </h1>
        <p style={errorStyles.content}>{error.data}</p>
      </div>
    );
  } else {
    return (
      <div style={errorStyles.container}>
        <h2 style={errorStyles.title}>{error.message}</h2>
        <pre style={errorStyles.content}>{error.stack}</pre>
      </div>
    );
  }
}

const errorStyles = {
  container: {
    padding: "20px",
    border: "2px solid #ff0000",
    borderRadius: "5px",
    backgroundColor: "#ffe6e6",
    width: "400px",
    margin: "auto",
    textAlign: "center",
    wordWrap: "break-word",
  },
  title: {
    color: "#ff0000",
    fontSize: "24px",
    marginBottom: "10px",
  },
  content: {
    color: "#555",
    fontSize: "14px",
    maxWidth: "100%",
  },
} as const;
