import { Link } from "react-router-dom";
import "../styles/global.css";

const Header = () => {
  return (
    <header>
      <img src="/logo.jpg" alt="Healthसुविधा Logo" className="border" />
      <h1>Healthसुविधा</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/insurance">Insurance</Link></li>
          <li><Link to="/medicine">Medicines</Link></li>
          <li><Link to="/helpline">Helpline</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
