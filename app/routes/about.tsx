import { useLocation } from "@remix-run/react"

export default function About(){
    const location = useLocation()
    console.log(location.state)
    console.log(location.hash)
    console.log(location.search)
    console.log(location.pathname)
    return <h1>About page</h1>
}