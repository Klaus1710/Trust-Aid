import { signIn } from "next-auth/react";
import Layout from "../components/Layout";
const NotAuthenticated = () => {
  return (
    <Layout>
      <div class="ui icon message">
        <i class="notched circle loading icon"></i>
        <div class="content">
          <div class="header">Sign In</div>
          <p>to continue...</p>
        </div>
      </div>
      <button class="ui primary button" onClick={() => signIn()}>Sign in</button>
    </Layout>
  );
};
export default NotAuthenticated;
