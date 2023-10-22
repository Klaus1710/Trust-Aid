import Link from "next/link";
const Header = () => {
  return (
    <div className="ui menu" style={{ marginTop: "20px", borderWidth: "3px", borderColor: "black" }}>
      <Link href="/">
        <a className="item"><b>Fund Raiser</b></a>
      </Link>
      <div className="right menu">
        <Link href="/">
          <a className="item"><b>Campaigns</b></a>
        </Link>
      </div>
    </div>
  );
};
export default Header;
