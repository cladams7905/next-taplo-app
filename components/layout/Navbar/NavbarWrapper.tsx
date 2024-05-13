import readUserSession from "@/lib/actions/readUserSession";
import Navbar from "./Navbar";

export default async function NavbarWapper() {
    const {data: {session}} = await readUserSession();
    return <Navbar session={session} />;
}