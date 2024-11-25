import { NavLink } from "@remix-run/react";

export default function Navbar() {
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
