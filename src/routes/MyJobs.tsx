import { useContext } from "react"
import { UserContext } from "../App";

export default function MyJobs() {
    const { username } = useContext(UserContext);

    return (
        <>
            <h1>Hello, {username}</h1>
            <h2>Here are your jobs</h2>
        </>
    )
}
