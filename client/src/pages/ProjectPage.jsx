import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { AppContext } from "../context/AppContext";

import { useNavigate } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { ProjectPageDetails } from "../components/GroupProjectPage/ProjectPageDetails";
import { ProjectRightMenu } from "../components/GroupProjectPage/ProjectRightMenu";

export const ProjectPage = ({ handleCoLabHome }) => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = useState({});

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [token]);

  const handleCompleteProject = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.patch(
        `/api/dashboard/projects/${project.project_id}/complete`,
        config
      );
      //console.log("Project marked as complete: ", response.data);
      fetchProject();
    } catch (error) {
      console.error("Error completing project:", error.message);
    }
  };

  const fetchProject = async () => {
    try {
      const response = await axios.get(`/api/projects/${projectId}`);
      setProject(response.data);
    } catch (error) {
      console.error("Error getting the project", error.message);
    }
  };
  useEffect(() => {
    fetchProject();
  }, [projectId]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar handleCoLabHome={handleCoLabHome} />
      <div className="flex flex-1 mt-16">
        <UserLeftMenu />
        <div className="flex-grow flex flex-col overflow-y-auto w-full lg:mx-[300px]">
          <ProjectPageDetails project={project} />
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
        <ProjectRightMenu
          project={project}
          owner={project.owner_id}
          handleCompleteProject={handleCompleteProject}
        />
      </div>
    </div>
  );
};
