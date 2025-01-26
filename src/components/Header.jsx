import React from "react";
const Header = () => {
  return (
    <header className="bg-gray-600 py-6 px-6 sm:py-6 sm:px-6 md:py-8 md:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <i className="ri-calendar-2-line  text-yellow-400 text-2xl sm:text-3xl "></i>
          <div className="text-white text-2xl sm:text-3xl md:text-4xl ">
            Full Calendar
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
