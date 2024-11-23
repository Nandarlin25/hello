import React from "react";
import { Link } from "react-router-dom";

const ModuleBtn = ({ name, icon, url }) => {
  return (
    <Link to={url} className="flex flex-col h-full bg-blue-600 gap-5 p-5 rounded-lg justify-center items-center text-white">
      {icon}
      {name}
    </Link>
  );
};

export default ModuleBtn;
