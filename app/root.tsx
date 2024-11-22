import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  NavLink,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

// styles
import styles from "./style.css?url";
import bootstrap from "./bootstrap.css?url";
// import tailwind from "./tailwind.css?url";

//components
import Brand from "./components/Brand";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: bootstrap },
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
        <Nav />
        <Brand />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function Nav() {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink className="nav-link " to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/posts">
            Posts
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/about">
            About
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/demo">
            Demo
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default function App() {
  return <Outlet />;
}
