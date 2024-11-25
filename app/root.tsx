import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

// styles
import styles from "./style.css?url";
// import bootstrap from "./bootstrap.css?url";
import picoCSS from "./pico.css?url";
// import tailwind from "./tailwind.css?url";

//components
import Brand from "./components/Brand";
import Navbar from "./components/Navbar";

export const links: LinksFunction = () => [
  // { rel: "stylesheet", href: bootstrap },
  { rel: "stylesheet", href: picoCSS },
  // { rel: "stylesheet", href: tailwind },
  { rel: "stylesheet", href: styles },
];

export function Layout({ children }: { children: React.ReactNode }) {
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
          <Navbar />
          <Brand />
        </header>
        <main className="container">{children}</main>
        <footer></footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
