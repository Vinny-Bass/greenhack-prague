import { Link } from "react-router-dom";
import './Header.css';

const Header = () => {
  return (
    <header>
      <div className="logo">OptiEnergy</div>
      <nav>
        <ul>
          <li><Link to={"/"}>Home</Link></li>
          <li><Link to={"/companies"}>MarketPlace</Link></li>
          <li><button className="partner-button">Search</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
