import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"; // Import the right arrow icon

function Header() {
  return (
    <header className="relative flex flex-col items-center justify-center text-center py-10 px-4 bg-[#B2FFFF]">
      {/* Main Title */}
      <h1 className="text-5xl md:text-7xl font-extrabold text-teal-700 drop-shadow-lg mb-6 z-10">
        {" "}
        {/* Adjusted text color for better contrast on lighter background */}
        Currency Exchange
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10 z-10">
        {" "}
        {/* Adjusted text color for better contrast */}
        Get real-time exchange rates, convert currencies instantly, and track
        market trends with our comprehensive currency tools.
      </p>

      {/* Call-to-Action Buttons */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 z-10">
        <button className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700 md:py-4 md:text-lg md:px-10 transition-colors duration-300">
          Explore Markets
          {/* Font Awesome Icon for arrow */}
          <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-lg" />{" "}
          {/* text-lg for size */}
        </button>
        <button className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10 transition-colors duration-300">
          Latest News
        </button>
      </div>
    </header>
  );
}

export default Header;
