import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

//Components
import { Navbar } from "../components/Navbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components/UserRightMenuComponents/UserRightMenu";
import { ProjectEditField } from "../components/Projects/ProjectEditField";

export const EditProject = () => {
  const { token } = useContext(AppContext);
  const [project, setProject] = useState({
    name: "",
    description: "",
    max_participants: 1,
    cover_photo_path: "",
    githubRepo: "",
    figmaLink: "",
    trelloLink: "",
    tech_names: [],
  });
  const navigate = useNavigate();

  const { projectId } = useParams();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [token]);

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

  return (
    <div className="flex flex-col h-screen mx-72">
      <Navbar />
      <div className="flex flex-1 mt-16">
        <UserLeftMenu />
        <div className="flex flex-col w-full h-full bg-project-background overflow-hidden">
          <div className="flex-grow flex justify-center h-full mx-10 my-5">
            <ProjectEditField project={project} />
          </div>
        </div>
        <UserRightMenu />
      </div>
    </div>
  );
};
