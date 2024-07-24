import React from "react";
import Vial from "../images/vial.png";

export const Navbar = () => {
  return (
    <div className="navbar w-screen bg-navbar-color text-text-color">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl group">
          <img src={Vial} className="h-7 mb-2 group-hover:animate-unstableBeaker" />
          CoLab
        </a>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost w-auto px-2 mx-1 group">
          <i className="fa-solid fa-circle-plus group-hover:animate-bounceFast"></i> Create a project
        </button>
        <button className="btn btn-square btn-ghost w-auto px-2 mx-1 group">
          <i className="fa-solid fa-bell group-hover:animate-swing"></i> Join requests
        </button>
      </div>
    </div>
  );
};
