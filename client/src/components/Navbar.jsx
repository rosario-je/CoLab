import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

//Components
import MobileNav from "./MobileNav";
import { RxHamburgerMenu } from "react-icons/rx";

export const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { handleLogout, currentUser, requests } = useContext(AppContext);
  const navigate = useNavigate();

  const handleHamburgerMenu = () => {
    if (mobileMenu == false) {
      setMobileMenu(true);
    } else {
      setMobileMenu(false);
    }
  };

  return (
    <div className="navbar w-screen bg-navbar-color text-text-color fixed top-0 left-0 right-0 z-50">
      <div
        className={
          mobileMenu == true &&
          `lg:hidden absolute top-0 left-0 w-screen h-screen bg-slate-900/40 transition backdrop-blur-sm ease-linear duration-500`
        }
      />
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
      <div className="pr-5 md:pr-10 ">
        <button onClick={handleLogout}>
          <div className="hidden lg:btn bg-alt-grey hover:bg-alt-grey-hover btn-xs sm:btn-sm md:btn-md lg:btn-lg border-2 border-project-border/25 hover:border-project-border/25 text-text-color/90">
            Logout
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </div>
        </button>
        <button>
          <RxHamburgerMenu
            className="text-3xl lg:hidden"
            onClick={handleHamburgerMenu}
          />
        </button>
        <MobileNav
          handleHamburgerMenu={handleHamburgerMenu}
          mobileMenu={mobileMenu}
          handleLogout={handleLogout}
        />
      </div>
    </div>
  );
};
