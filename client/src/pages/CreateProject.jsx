import React, { useContext, useEffect } from "react";

import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components/UserRightMenuComponents/UserRightMenu";
import { ProjectCreateField } from "../components/Projects/ProjectCreateField";

export const CreateProject = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [token]);
  return (
    <div className="flex flex-col h-screen lg:mx-72">
      <Navbar />
      <div className="flex flex-1 mt-16">
        <UserLeftMenu />
        <div className="flex flex-col w-full h-full bg-project-background overflow-hidden mt-10">
          <div className="flex-grow flex justify-center h-full lg:mx-10 my-5">
            <div className="flex bg-menu-colors fixed left-0 right-0 lg:left-[300px] lg:right-[300px] z-10 top-16 lg:top-20 h-[65px] justify-start items-center">
              <h1 className="text-white text-2xl w-full text-center">Create a Project!</h1>
            </div>
            <ProjectCreateField />
          </div>
        </div>
        <UserRightMenu />
      </div>
    </div>
  );
};
