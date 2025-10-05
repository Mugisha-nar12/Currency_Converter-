import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <h1>Currency Converter</h1>
      </div>
      <nav>
        <ul>
          <li>Home</li>
          <li>Market</li>
          <li>News</li>
          <li>Alerts</li>
          <li>Settings</li>
          <li>About</li>
        </ul>
      </nav>
      <div className="themetoggle">
        <i className="fas fa-moon"></i>
        <i className="fas fa-sun"></i>
      </div>
    </>
  );
};

export default Navbar;
