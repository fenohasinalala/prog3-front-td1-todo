import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Header = () => {
  return (
    <header>
      <nav className="navheader">
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/to-do">TO DO</Link>
          </li>
          <li>
            <Link to="/request">REQUEST</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
