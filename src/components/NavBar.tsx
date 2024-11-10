import React from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import "./NavBar.css"; // Importera CSS-fil för att styla

interface INavBarProps {
  onClickNavBarSearch: any;
  onClickNavBarMenu: any;
}

const NavBar = (props: INavBarProps) => {
  return (
    <nav className="navbar">
      {/* Logotypen */}
      <div className="logo">HAPP</div>

      {/* Ikoner till höger */}
      <div className="icons">
        <FaSearch className="icon" onClick={props.onClickNavBarSearch} />
        <FaBars className="icon" onClick={props.onClickNavBarMenu} />
      </div>
    </nav>
  );
};

export default NavBar;
