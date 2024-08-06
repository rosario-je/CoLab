import React, { useEffect, useState } from "react";
import axios from "axios";

import { Navbar } from "../components/Navbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components//UserRightMenuComponents/UserRightMenu";
import { ProjectCard } from "../components/Projects/ProjectCard";
import { Skeletons } from "../components/LoadingComponents/Skeletons";

export const MyProjects = ({ handleCoLabHome, currentUser }) => {
  const [fetchingProjects, setFetchingProjects] = useState(true);
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
        setTimeout(() => {
          setFetchingProjects(false);
        }, 400);
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

        <div className="flex flex-col w-full bg-project-background overflow-hidden mx-72 px-10 mt-20">
          <div className="flex bg-menu-colors fixed left-[300px] right-[300px] z-10 top-20 h-[65px] justify-start items-center">
            <h1 className="text-white text-2xl">My Projects</h1>
          </div>
          {fetchingProjects ? (
            <Skeletons />
          ) : (
            projects.map((project) => (
              <ProjectCard
                key={project.project_id}
                page="myprojects"
                currentUserId={userId}
                project={project}
              />
            ))
          )}
        </div>
        <UserRightMenu currentUser={currentUser} />
      </div>
    </div>
  );
};
