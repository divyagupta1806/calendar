import React from "react";

const GlobalDialog = ({ children, className = "" }) => {
  return (
    <div
      className={`${className} fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50`}
    >
      {children}
    </div>
  );
};

export default GlobalDialog;
