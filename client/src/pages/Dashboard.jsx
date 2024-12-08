import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

//Components
import { AppContext } from "../context/AppContext";
import { Navbar } from "../components/Navbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components/UserRightMenuComponents/UserRightMenu";
import { SearchBar } from "../components/SearchBar";
import { ProjectCard } from "../components/Projects/ProjectCard";
import { UserErrorMessage } from "../components/AlertHandling/UserErrorMessage";
import { Skeletons } from "../components/LoadingComponents/Skeletons";

export const Dashboard = ({ handleCoLabHome }) => {
  const { error, setAppError, clearAppError, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [fetchingProjects, setFetchingProjects] = useState(true);
  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const userId = localStorage.getItem("id");
  const userName = localStorage.getItem("username");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [token]);

  /*------------------- Fetch projects --------------*/
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const projectData = await axios.get("/api/dashboard/projects", config);
        setProjects(projectData.data);
        setAllProjects(projectData.data);
        setTimeout(() => {
          setFetchingProjects(false);
        }, 400);
      } catch (error) {
        console.error("Error in getting projects: ", error.message);
      }
    };

    fetchProjects();
  }, []);

  /*------------------- Search functionality --------------*/
  const handleSearch = async (query) => {
    if (query.trim()) {
      try {
        const response = await axios.post("/api/dashboard/search", {
          tech_name: query,
        });
        const searchResults = response.data;
        setProjects(searchResults);
      } catch (error) {
        setAppError(error.response.data);
        console.error("Error fetching search results:", error);
        setTimeout(() => {
          clearAppError();
        }, 2000);
      }
    } else {
      setProjects(allProjects);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar handleCoLabHome={handleCoLabHome} />
      <div className="flex flex-1 mt-16">
        <UserLeftMenu />
        <div className="flex flex-col w-full bg-project-background overflow-hidden pt-4">
          <div className="z-10 bg-black">
            <SearchBar handleSearch={handleSearch} />
            {error && (
              <div className="error-container fixed z-10 left-1/3">
                <UserErrorMessage error={error} />
              </div>
            )}
          </div>
          <div className="flex flex-col grow justify-center overflow-y-auto lg:mx-48 2xl:mx-72 mt-16 px-5 lg:px-10 h-max bg-project-background">
            {fetchingProjects ? (
              <Skeletons />
            ) : (
              projects.map((project) => (
                <ProjectCard
                  key={project.project_id}
                  page="dashboard"
                  currentUserId={userId}
                  currentUserName={userName}
                  project={project}
                />
              ))
            )}
          </div>
        </div>
        <UserRightMenu />
      </div>
    </div>
  );
};
