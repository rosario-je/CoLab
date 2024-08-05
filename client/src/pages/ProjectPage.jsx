import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Navbar } from "../components/Navbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { ProjectPageDetails } from "../components/GroupProjectPage/ProjectPageDetails";
import { ProjectRightMenu } from "../components/GroupProjectPage/ProjectRightMenu";

export const ProjectPage = ({ currentUser, handleLogout, handleCoLabHome }) => {
  const { projectId } = useParams();
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
    chat: [],
  });

  const fetchProject = async () => {
    try {
      const response = await axios.get(`/api/projects/${projectId}`);
      setProject(response.data);
    } catch (error) {
      console.error("Error getting the project", error.message);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar
        handleCoLabHome={handleCoLabHome}
        currentUser={currentUser}
        handleLogout={handleLogout}
      />
      <div className="flex flex-1 mt-16">
        <UserLeftMenu currentUser={currentUser} />
        <div
          className="flex-grow flex flex-col overflow-y-auto"
          style={{ marginLeft: "300px", marginRight: "300px" }}
        >
          <ProjectPageDetails
            currentUser={currentUser}
            project={project}
            fetchProject={fetchProject}
          />
          <div className="fixed top-0 left-[300px] right-[300px] z-10">
            <div className="w-full bg-white py-2 px-4 shadow-md">
              <input
                type="text"
                placeholder="Search..."
                className="input input-bordered w-full"
              />
            </div>
          </div>
        </div>
        <ProjectRightMenu currentUser={currentUser} project={project} />
      </div>
    </div>
  );
};
