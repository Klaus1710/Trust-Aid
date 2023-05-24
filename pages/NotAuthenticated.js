import {signIn} from "next-auth/react";
import Layout from "../components/Layout";
const NotAuthenticated = () =>{
    return (
        <Layout>
            <h3>Please Sign In first!</h3>
            <button onClick={() => signIn()}>Sign in</button>
        </Layout>
    )
}
export default NotAuthenticated;