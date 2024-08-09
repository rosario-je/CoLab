import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../context/AppContext";

export const Navbar = () => {
  const { currentUser, handleLogout } = useContext(AppContext);
  const navigate = useNavigate();

 

  return (
    <div className="navbar w-screen bg-navbar-color text-text-color fixed top-0 left-0 right-0 z-50">
      <div className="flex-1">
        <a
          className="btn btn-ghost text-2xl font-semibold group"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <img
            src="/idea.png"
            className="h-7 mb-2 group-hover:animate-unstableBeaker"
          />
          CoLab
        </a>
      </div>
      <div className="pr-10 ">
      <button onClick={handleLogout}>
        <div className="btn bg-alt-grey hover:bg-alt-grey-hover btn-xs sm:btn-sm md:btn-md lg:btn-lg border-2 border-project-border/25 hover:border-project-border/25 text-text-color/90">
          Logout
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </div>
        </button>
      </div>
    </div>
  );
};
