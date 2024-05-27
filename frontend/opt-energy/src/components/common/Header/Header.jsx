import './Header.css';

const Header = () => {
  return (
    <header>
      <div className="logo">OptEnergy</div>
      <nav>
        <ul>
          <li>Calculator</li>
          <li>MarketPlace</li>
          <li><button className="partner-button">Search</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
