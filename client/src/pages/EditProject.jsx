import React, {useState, useEffect} from "react";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components/UserRightMenuComponents/UserRightMenu";
import { ProjectEditField } from "../components/Projects/ProjectEditField";

export const EditProject = ({
  handleTechStacksModal,
  techModal,
  currentUser,
}) => {
  const [projects, setProjects] = useState([]);
  // const [allProjects, setAllProjects] = useState([]);
  const userId = currentUser.id;


  return (
    <div className="flex flex-col h-screen mx-72">
      <Navbar currentUser={currentUser} />
      <div className="flex flex-1 mt-16">
        <UserLeftMenu currentUser={currentUser} />
        <div className="flex flex-col w-full h-full bg-project-background overflow-hidden">
          <div className="flex-grow flex justify-center h-full mx-10 my-5">
            <ProjectEditField
              handleTechStacksModal={handleTechStacksModal}
              techModal={techModal}
              projects={projects}
            />
          </div>
        </div>
        <UserRightMenu />
      </div>
    </div>
  );
};
