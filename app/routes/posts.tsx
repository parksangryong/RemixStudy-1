import { Link, NavLink, useNavigate } from "@remix-run/react";

export default function Posts(){

    const navigate = useNavigate()

    const handleClick = () => {

        navigate(-3)
      }
    

    return (
        <>
        <br/>

        <Link to="/about" replace state={{ some: "value" }}>About</Link>
        <br/>
        <Link to={{
        pathname: "/about",
        search: "?query=string",
        hash: "#hash"
        }}
        state={{ some: "value" }}
        >About</Link>

        <br/>

        <NavLink 
        to="/posts"
        style={({ isActive, isPending }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isPending ? "red" : "black",
            };
        }}
        
        >Posts</NavLink>
        <NavLink to="/about">About</NavLink>

        <br/>
        <button onClick={handleClick}>Submit</button>

        </>
    )
}