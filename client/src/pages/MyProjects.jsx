import React, { useEffect, useState } from "react";
import axios from "axios";

import { Navbar } from "../components/Navbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components//UserRightMenuComponents/UserRightMenu";
import { ProjectCard } from "../components/Projects/ProjectCard";

export const MyProjects = ({ handleCoLabHome, currentUser }) => {
  const [projects, setProjects] = useState([]);
  const userId = currentUser.id;

  // const handleButtonClick = (button) => {
  //   setActiveButton(button);
  // };

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const userProjectData = await axios.get(
          `/api/dashboard/${userId}/my_projects`
        );
        setProjects(userProjectData.data);
      } catch (error) {
        console.error("Error in getting user projects: ", error.message);
      }
    };
    fetchUserProjects();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar handleCoLabHome={handleCoLabHome} currentUser={currentUser} />
      <div className="flex flex-1 mt-16">
        <UserLeftMenu currentUser={currentUser} />

        <div className="flex flex-col w-full bg-project-background overflow-hidden mx-72 px-10">
          {projects.map((project) => (
            <ProjectCard
              key={project.project_id}
              page="myprojects"
              currentUserId={userId}
              project={project}
            />
          ))}
        </div>
        <UserRightMenu currentUser={currentUser} />
      </div>
    </div>
  );
};
