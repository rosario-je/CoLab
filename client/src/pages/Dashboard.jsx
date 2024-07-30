import React, { useState, useEffect } from "react";
import axios from "axios";

import { Navbar } from "../components/Navbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components/UserRightMenuComponents/UserRightMenu";
import { SearchBar } from "../components/SearchBar";
import { ProjectCard } from "../components/Projects/ProjectCard";

export const Dashboard = ({ handleCoLabHome, currentUser, handleLogout }) => {
  const [projects, setProjects] = useState([]);
  const userId = currentUser.id;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await axios.get("/api/dashboard/projects");
        setProjects(projectData.data);
        console.log("Projects: ", projectData.data);
      } catch (error) {
        console.error("Error in getting projects: ", error.message);
      }
    };
    fetchProjects();
  }, []);
  console.log("dashboard:", projects);

  return (
    <div className="flex flex-col h-screen">
      <Navbar handleCoLabHome={handleCoLabHome} currentUser={currentUser} />
      <div className="flex mt-16">
        <UserLeftMenu currentUser={currentUser} />
        <div className="flex flex-col w-full bg-project-background overflow-hidden pt-4">
          <div className="z-10 bg-black">
            <SearchBar />
          </div>
          <div className="flex flex-col grow justify-center overflow-y-auto mx-72 mt-16 px-10">
            {projects.map((project) => (
              <ProjectCard
                key={project.project_id}
                name={project.name}
                owner={project.owner_id}
                description={project.description}
                participants={project.participants}
                techStack={project.tech_requirements}
                acceptingUsers={project.is_accepting_users}
                maxParticipants={project.max_participants}
                page="dashboard"
                currentUserId = {userId}
              />
            ))}
          </div>
        </div>
        <UserRightMenu currentUser={currentUser} />
      </div>
    </div>
  );
};
