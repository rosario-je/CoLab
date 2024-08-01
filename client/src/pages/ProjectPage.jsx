// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Navbar } from "../components/Navbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { ProjectPageDetails } from "../components/GroupProjectPage/ProjectPageDetails";
import { ProjectRightMenu } from "../components/GroupProjectPage/ProjectRightMenu";

export const ProjectPage = ({ currentUser, handleLogout, handleCoLabHome }) => {

  const [project, setProject] = useState({
    name: "",
    cover_photo_path: "",
    description: "",
    figma_link: "",
    github_repo: "",
    owner_email: "",
    owner_pic: "",
    owner_username: "",
    participants: [],
    tech_requirements: [],
  });

  const { projectId } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/api/projects/${projectId}`);
        setProject(response.data);
      } catch (error) {
        console.error("Error getting the project", error.message);
      }
    };
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

console.log(project);
  return (
    <div className="flex flex-col h-screen">
      <Navbar handleCoLabHome={handleCoLabHome} currentUser={currentUser} handleLogout={handleLogout}/>
      <div className="flex flex-1 mt-16">
        <UserLeftMenu currentUser={currentUser} />
        <div className="flex grow  justify-center overflow-y-auto mx-72 w-screen">
          <ProjectPageDetails currentUser={currentUser} project={project}/>
        </div>
        <ProjectRightMenu currentUser={currentUser} project={project} />
      </div>
    </div>
  );
};
