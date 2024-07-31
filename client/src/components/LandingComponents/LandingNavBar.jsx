import React from "react";
import vial from "../../images/vial.png";
import { useNavigate } from "react-router-dom";

export const LandingNavBar = ({
  currentUser,
  handleLogout,
  handleCoLabHome,
}) => {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="navbar bg-landing-navbar-color/50 backdrop-blur-xl">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-white group">
            <img
              src={vial}
              className="h-7 mb-2 group-hover:animate-unstableBeaker"
            />
            CoLab
          </a>
        </div>
        <div className="flex-none">
          <div className="signin-button pr-5">
            {!currentUser ? (
              <div
                onClick={() => {
                  navigate("/signin");
                }}
                className="btn bg-landing-signin-button rounded-full text-white"
              >
                <h2>Sign In</h2>
              </div>
            ) : (
                <div className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
                  <button onClick={handleLogout}>Logout</button>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
