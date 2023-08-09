import Link from "next/link";
const Header = () => {
  return (
    <div className="ui menu" style={{ marginTop: "10px" }}>
      <Link href="/">
        <a className="item">Fund Raiser</a>
      </Link>
      <div className="right menu">
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
