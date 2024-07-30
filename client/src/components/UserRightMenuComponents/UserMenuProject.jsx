import React from "react";

export const UserMenuProject = (props) => {
  return (
    <li className="group">
      <a className="flex items-center">
        <i className="fa-regular fa-square text-2xl group-hover:animate-sideToSide group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-2"></i>
        {props.projectName}
      </a>
    </li>
  );
};
