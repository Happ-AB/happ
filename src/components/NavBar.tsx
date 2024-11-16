import React from "react";
import { FaSearch, FaBars, FaFilter } from "react-icons/fa";
import "./NavBar.css"; // Importera CSS-fil för att styla

interface INavBarProps {
  onClickNavBarSearch: any;
  onClickNavBarFilter: any;
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
        <FaFilter className="icon" onClick={props.onClickNavBarFilter} />
        <FaBars className="icon" onClick={props.onClickNavBarMenu} />
      </div>
    </nav>
  );
};

export default NavBar;
