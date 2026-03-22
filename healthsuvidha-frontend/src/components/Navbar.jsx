import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg"; // ✅ correct path
import "../styles/global.css"; // ✅ correct path

const Navbar = () => {
  return (
    <header>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="Healthसुविधा Logo" />
        <h1>Healthसुविधा</h1>
      </div>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/insurance">Insurance</Link>
          </li>
          <li>
            <Link to="/medicine">Medicines</Link>
          </li>
          <li>
            <Link to="/helpline">Helpline</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            {/* <a href="/appointments">My Appointments</a> */}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
