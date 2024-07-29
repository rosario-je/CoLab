// CreateProject.jsx
import React from "react";
import { CreateProjectNavbar } from "../components/CreateProjectNavbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components/UserRightMenu";
import { ProjectCreateField } from "../components/Projects/ProjectCreateField";
import { CreateProjectTechStackModal } from "../components/CreateProjectTechStackModal";

export const CreateProject = ({ handleTechStacksModal, techModal }) => {
  return (
    <div className="flex flex-col h-screen mx-72">
      <CreateProjectNavbar />
      <div className="flex flex-1 mt-16">
        <UserLeftMenu />
        <div className="flex flex-col w-full h-full bg-project-background overflow-hidden">
          <div className="flex-grow flex justify-center h-full mx-10 my-5">
            <ProjectCreateField handleTechStacksModal={handleTechStacksModal} techModal={techModal}/>
          </div>
        </div>
        <UserRightMenu />
      </div>
    </div>
  );
};
