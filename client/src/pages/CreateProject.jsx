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
    <div className="flex flex-col h-screen lg:mx-48 2xl:mx-72">
      <Navbar />
      <div className="flex flex-1 mt-16">
        <UserLeftMenu />
        <div className="flex flex-col w-full h-full bg-project-background overflow-hidden mt-10">
          <div className="flex-grow flex justify-center h-full mx-1 lg:mx-10 mb-3 md:py-5">
            <div className="pageBanner">
              <h1 className="text-white text-xl md:text-base  w-full text-center">
                Create a Project!
              </h1>
            </div>
            <ProjectCreateField />
          </div>
        </div>
        <UserRightMenu />
      </div>
    </div>
  );
};
