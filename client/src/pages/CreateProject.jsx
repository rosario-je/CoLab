import React from "react";

import { Navbar } from "../components/Navbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components/UserRightMenu";
import { ProjectCreateField } from "../components/Projects/ProjectCreateField";

export const CreateProject = ({
  handleTechStacksModal,
  techModal,
  currentUser,
}) => {
  return (
    <div className="flex flex-col h-screen mx-72">
      <Navbar currentUser={currentUser} />
      <div className="flex flex-1 mt-16">
        <UserLeftMenu currentUser={currentUser} />
        <div className="flex flex-col w-full h-full bg-project-background overflow-hidden">
          <div className="flex-grow flex justify-center h-full mx-10 my-5">
            <ProjectCreateField
              handleTechStacksModal={handleTechStacksModal}
              techModal={techModal}
            />
          </div>
        </div>
        <UserRightMenu />
      </div>
    </div>
  );
};
