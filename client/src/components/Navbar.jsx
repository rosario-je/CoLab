import React from "react";
import Vial from "../images/vial.png";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ currenUser }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await axios.post("/api/logout").then(() => {
      navigate("/signin");
    });
  };

  return (
    <div className="navbar w-screen bg-navbar-color text-text-color fixed top-0 left-0 right-0 z-50">
      <div className="flex-1">
        <a
          className="btn btn-ghost text-xl group"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <img
            src={Vial}
            className="h-7 mb-2 group-hover:animate-unstableBeaker"
          />
          CoLab
        </a>
      </div>
      <div className="pr-5">
        <div className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};
