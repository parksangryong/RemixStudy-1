import { NavLink } from "@remix-run/react";

export default function Navbar() {
  const style = ({
    isActive,
    isPending,
  }: {
    isActive: boolean;
    isPending: boolean;
  }) => ({
    fontWeight: isPending ? "bold" : "normal",
    color: isActive ? "red" : "black",
  });

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" style={style}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/posts" style={style}>
            Posts
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" style={style}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/demo" style={style}>
            Demo
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
