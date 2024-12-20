import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

//Components
import { Navbar } from "../components/Navbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components//UserRightMenuComponents/UserRightMenu";
import { ProjectCard } from "../components/Projects/ProjectCard";
import { Skeletons } from "../components/LoadingComponents/Skeletons";

export const MyProjects = ({ handleCoLabHome }) => {
  const { currentUser, token } = useContext(AppContext);
  const navigate = useNavigate();
  const [fetchingProjects, setFetchingProjects] = useState(true);
  const [projects, setProjects] = useState([]);
  const userId = currentUser.id;
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [token]);

  const fetchUserProjects = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const userProjectData = await axios.get(
        `/api/dashboard/${userId}/my_projects`,
        config
      );
      setProjects(userProjectData.data);
      setTimeout(() => {
        setFetchingProjects(false);
      }, 400);
    } catch (error) {
      console.error("Error in getting user projects: ", error.message);
    }
  };
  useEffect(() => {
    fetchUserProjects();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar handleCoLabHome={handleCoLabHome} />
      <div className="flex flex-1 mt-16">
        <UserLeftMenu />
        <div className="flex flex-col grow justify-start overflow-y-auto lg:mx-48 2xl:mx-72 mt-10 md:mt-16 px-5 lg:px-10 h-full bg-project-background">
          <div className="flex bg-menu-colors fixed left-0 right-0 lg:left-[200px] lg:right-[200px] 2xl:left-[300px] 2xl:right-[300px] z-10 top-16 lg:top-20 h-[45px] md:h-[65px] justify-start items-center">
            <h1 className="text-white text-xl md:text-base  w-full text-center">My Projects</h1>
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
                fetchUserProjects={fetchUserProjects}
              />
            ))
          )}
        </div>
        <UserRightMenu />
      </div>
    </div>
  );
};
