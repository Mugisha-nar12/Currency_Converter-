import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FaArrowTrendUp } from "react-icons/fa6";

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Market", href: "/market" },
    { name: "News", href: "/News" },
    { name: "Alerts", href: "#" },
    { name: "Settings", href: "#" },
    { name: "About", href: "#" },
  ];

  return (
    <nav className="bg-white shadow-sm dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <FaArrowTrendUp className="text-2xl text-teal-600 dark:text-teal-400" />
              <span className="text-2xl font-bold text-teal-700 dark:text-teal-300">
                Currency
                <span className="text-teal-600 dark:text-teal-400">
                  Exchange
                </span>
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <div className="hidden md:flex items-center space-x-6 m-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`
                    text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400
                    px-3 py-2 text-base font-medium relative group
                  `}
                >
                  {link.name}
                  <span
                    className={`
                      absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 dark:bg-teal-400
                      transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300
                    `}
                  ></span>
                </Link>
              ))}
            </div>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              {isDarkMode ? (
                <FontAwesomeIcon icon={faSun} className="text-xl" />
              ) : (
                <FontAwesomeIcon icon={faMoon} className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
