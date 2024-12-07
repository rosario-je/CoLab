import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

//Context
import { AppContext } from "../context/AppContext";

//Icons
import { GrClose } from "react-icons/gr";

const MobileNav = ({ handleHamburgerMenu, mobileMenu, handleLogout }) => {
  const { currentUser } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div
      className={clsx(
        "fixed top-0 h-screen lg:hidden bg-menu-colors shadow-2xl transition-all duration-500 z-50",
        {
          "right-0 w-[40%]": mobileMenu,
          "right-[-100%] w-[40%]": !mobileMenu,
        }
      )}
    >
      <GrClose
        className="absolute top-5 right-10 text-xl cursor-pointer"
        onClick={handleHamburgerMenu}
      />
      <ul className="flex flex-col items-center justify-center h-full gap-y-10 font-primary font-medium text-sm md:text-xl">
        <li onClick={() => navigate("/Dashboard")}>Feed</li>
        <li
          onClick={() =>
            currentUser && navigate(`/${currentUser.id}/myprojects`)
          }
        >
          My Projects
        </li>
        <li
          onClick={() =>
            currentUser && navigate(`/${currentUser.id}/project/create`)
          }
        >
          Create a Project
        </li>
        <li
          onClick={() =>
            currentUser && navigate(`/${currentUser.id}/myprojects/requests`)
          }
        >
          Join Requests
        </li>
        <li
          onClick={() =>
            currentUser && navigate(`/${currentUser.id}/notifications`)
          }
        >
          Notifications
        </li>
        <li>
          <div className="w-[100px] h-[1px] bg-white" />
        </li>
        <div className="user-info flex flex-col items-center gap-y-2">
          <img
            src={`/profile_pics/${currentUser.profile_pic}`}
            alt="profile"
            className="rounded-full h-16 w-16 border-icon-purple border-2"
          />
          <h3>@{currentUser.username}</h3>
        </div>
        <li>
          <button onClick={handleLogout}>
            <div className="landingBtn">
              <h1 className="btnTextStyle">Logout</h1>
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MobileNav;
