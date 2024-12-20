import { NavLink, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
export default function Navbar() {
  const location = useLocation();
  console.log(location);
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

  const [isHideNavbar, setIsHideNavbar] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("/login")) {
      setIsHideNavbar(true);
    } else {
      setIsHideNavbar(false);
    }
  }, [location.pathname]);
  //
  return (
    <>
      {isHideNavbar ? (
        <></>
      ) : (
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
      )}
    </>
  );
}
