import Link from "next/link";
const Header = () => {
  return (
    <div class="ui menu" style={{ marginTop: "10px" }}>
      <Link href="/">
        <a class="item">Fund Raiser</a>
      </Link>
      <div class="right menu">
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
