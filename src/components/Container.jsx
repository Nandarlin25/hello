import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={`w-full md:w-[1000px] lg:[1400px] mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default Container;
