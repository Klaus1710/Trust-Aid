import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
const Header = () => {
  const { data: session } = useSession();
  return (
    <div className="ui menu" style={{ marginTop: "10px" }}>
      <Link href="/">
        <a className="item">Fund Raiser</a>
      </Link>
      <div className="right menu">
        {session && <button className="ui primary button" onClick={() => signOut()}>Sign out</button>}
        {!session && <button onClick={() => signIn()}>Sign in</button>}
        <Link href="/">
          <a className="item">Campaigns</a>
        </Link>
        <Link href="/campaigns/new">
          <a className="item">+</a>
        </Link>
      </div>
    </div>
  );
};
export default Header;
