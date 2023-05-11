import { Link } from "../routes";
const Header = () => {
  return (
    <div class="ui menu" style={{ marginTop: "10px" }}>
      <Link route="/">
        <a class="item">Fund Raiser</a>
      </Link>
      <div class="right menu">
        <Link route="/">
          <a class="item">Campaigns</a>
        </Link>
        <Link route="/campaigns/new">
          <a class="item">+</a>
        </Link>
      </div>
    </div>
  );
};
export default Header;
