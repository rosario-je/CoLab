import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components/UserRightMenu";

export const MyProjects = ({ handleCoLabHome }) => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar handleCoLabHome={handleCoLabHome} />
      <div className="flex flex-1 mt-16">
        <UserLeftMenu />
        <div className="flex flex-col w-full bg-grey overflow-hidden mx-72">
          <div className="flex justify-center items-center w-[100%] bg-menu-colors py-3 px-2 h-16">
            <div className="flex justify-around items-center bg-projects-bar rounded-[10px] w-[90%] py-1 w-full]">
              <button
                onClick={() => handleButtonClick("allProjects")}
                className={`btn text-white w-60 ${
                  activeButton === "allProjects"
                    ? "bg-projects-bar-button"
                    : "bg-default-color"
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => handleButtonClick("myProjects")}
                className={`btn text-white w-60 ${
                  activeButton === "myProjects"
                    ? "bg-projects-bar-button"
                    : "bg-default-color"
                }`}
              >
                My Projects
              </button>
              <button
                onClick={() => handleButtonClick("collaborations")}
                className={`btn text-white w-60 ${
                  activeButton === "collaborations"
                    ? "bg-projects-bar-button"
                    : "bg-default-color"
                }`}
              >
                Collaborations
              </button>
            </div>
          </div>
        </div>
        <UserRightMenu />
      </div>
    </div>
  );
};
