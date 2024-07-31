import React, { useEffect, useState } from "react";
import axios from "axios";

import { Navbar } from "../components/Navbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components//UserRightMenuComponents/UserRightMenu";
import { ProjectCard } from "../components/Projects/ProjectCard";

export const MyProjects = ({ handleCoLabHome, currentUser}) => {
  const [projects, setProjects] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const userId = currentUser.id;
  
  // const handleButtonClick = (button) => {
  //   setActiveButton(button);
  // };

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const userProjectData = await axios.get(`/api/dashboard/${userId}/my_projects`);
        setProjects(userProjectData.data);
        console.log("User Projects: ", userProjectData.data);
      } catch (error) {
        console.error("Error in getting user projects: ", error.message);
      }
    };
    fetchUserProjects();
  }, []);
console.log("my project:" ,projects);
  return (
    <div className="flex flex-col h-screen">
      <Navbar handleCoLabHome={handleCoLabHome} currentUser={currentUser} />

      <div className="flex flex-1 mt-16">
        <UserLeftMenu currentUser={currentUser} />

        <div className="flex flex-col w-full bg-grey overflow-hidden mx-72 px-10">
          {projects.map((project) => (
            <ProjectCard
              key={project.project_id}
              name={project.name}
              owner={project.owner_id}
              description={project.description}
              cover_photo_path={project.cover_photo_path}
              participants={project.participants}
              techStack={project.tech_requirements}
              acceptingUsers={project.is_accepting_users}
              maxParticipants={project.max_participants}
              page="myprojects"
              currentUserId = {userId}
            />
          ))}
        </div>
        <UserRightMenu currentUser={currentUser} />
      </div>
    </div>
  );
};
