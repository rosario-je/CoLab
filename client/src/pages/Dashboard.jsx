import React, { useState, useEffect } from "react";
import axios from "axios";

import { Navbar } from "../components/Navbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components/UserRightMenuComponents/UserRightMenu";
import { SearchBar } from "../components/SearchBar";
import { ProjectCard } from "../components/Projects/ProjectCard";

import { Skeletons } from "../components/LoadingComponents/Skeletons";

export const Dashboard = ({ handleCoLabHome, currentUser, handleLogout }) => {
  const [fetchingProjects, setFetchingProjects] = useState(true);
  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const userId = currentUser.id;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await axios.get("/api/dashboard/projects");
        setProjects(projectData.data);
        setAllProjects(projectData.data);
        setTimeout(() => {
          setFetchingProjects(false)
        }, 400)
        //console.log("Projects: ", projectData.data);
      } catch (error) {
        console.error("Error in getting projects: ", error.message);
      }
    };
    fetchProjects();
  }, []);

  const handleSearch = async (query) => {
    if (query.trim()) {
      try {
        const response = await axios.post("/api/dashboard/search", {
          tech_name: query,
        });
        const searchResults = response.data;
        setProjects(searchResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setProjects(allProjects);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar handleCoLabHome={handleCoLabHome} currentUser={currentUser} />
      <div className="flex mt-16">
        <UserLeftMenu currentUser={currentUser} />
        <div className="flex flex-col w-full bg-project-background overflow-hidden pt-4">
          <div className="z-10 bg-black">
            <SearchBar handleSearch={handleSearch} />
          </div>
          <div className="flex flex-col grow justify-center overflow-y-auto mx-72 mt-16 px-10 h-max">
            {fetchingProjects ? (
              <Skeletons />
            ) : (
              projects.map((project) => (
                <ProjectCard
                  key={project.project_id}
                  page="dashboard"
                  currentUserId={userId}
                  project={project}
                />
              ))
            )}
          </div>
        </div>
        <UserRightMenu currentUser={currentUser} />
      </div>
    </div>
  );
};
