import React from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import "./NavBar.css"; // Importera CSS-fil för att styla

const NavBar = () => {
  return (
    <nav className="navbar">
      {/* Logotypen */}
      <div className="logo">HAPP</div>

      {/* Ikoner till höger */}
      <div className="icons">
        <FaSearch className="icon" />
        <FaBars className="icon" />
      </div>
    </nav>
  );
};

export default NavBar;
