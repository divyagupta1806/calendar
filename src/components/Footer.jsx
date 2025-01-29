import React from "react";

const Footer = () => {
  return (
    <footer className="relative mb-0">
      <div className="py-4 px-4 bg-gray-700 text-white mt-8 absolute bottom-0  sm:relative absolute bottom-0 w-full">
        <div className="text-center">
          <p>@{new Date().getFullYear()} Full Calendar</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
