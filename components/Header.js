import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
const Header = () => {
  const { data: session } = useSession();
  return (
    <div class="ui menu" style={{ marginTop: "10px" }}>
      <Link href="/">
        <a class="item">Fund Raiser</a>
      </Link>
      <div class="right menu">
        {session && <button class="ui primary button" onClick={() => signOut()}>Sign out</button>}
        {!session && <button onClick={() => signIn()}>Sign in</button>}
        <Link href="/">
          <a class="item">Campaigns</a>
        </Link>
        <Link href="/campaigns/new">
          <a class="item">+</a>
        </Link>
      </div>
    </div>
  );
};
export default Header;
