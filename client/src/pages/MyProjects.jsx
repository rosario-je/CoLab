import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Navbar } from "../components/Navbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components/UserRightMenu";

export const MyProjects = ({ handleCoLabHome }) => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn, navigate]);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar handleCoLabHome={handleCoLabHome} />
      <div className="flex flex-1 mt-16">
        <UserLeftMenu />
        <div className="flex flex-col w-full bg-grey overflow-hidden">
          <div className="flex justify-center items-center w-[100%] bg-menu-colors py-3 px-2">
            <div className="flex justify-center items-center gap-[30px] bg-projects-bar rounded-[10px] w-[90%] py-1 w-full]">
              <button
                onClick={() => handleButtonClick('allProjects')}
                className={`btn w-[30%] text-white ${activeButton === 'allProjects' ? 'bg-projects-bar-button' : 'bg-default-color'}`}
              >
                All Projects
              </button>
              <button
                onClick={() => handleButtonClick('myProjects')}
                className={`btn w-[30%] text-white ${activeButton === 'myProjects' ? 'bg-projects-bar-button' : 'bg-default-color'}`}
              >
                My Projects
              </button>
              <button
                onClick={() => handleButtonClick('collaborations')}
                className={`btn w-[30%] text-white ${activeButton === 'collaborations' ? 'bg-projects-bar-button' : 'bg-default-color'}`}
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
