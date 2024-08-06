import React, { useState, useEffect } from "react";
import { ProjectIcon } from "./ProjectIcon";
import axios from "axios";

export const ProjectRightMenu = ({ project, currentUser }) => {
  const [rightMenuProjects, setRightMenuProjects] = useState([]);

  useEffect(() => {
    const fetchRightUserMenu = async () => {
      try {
        const response = await axios.get(
          `/api/dashboard/${currentUser.id}/my_projects`
        );
        setRightMenuProjects(response.data);
      } catch (error) {
        console.error(
          "Error getting projects for the right user menu: ",
          error.message
        );
      }
    };
    fetchRightUserMenu();
  }, []);

  return (
    <div className="flex flex-col fixed top-0 right-0 w-[300px] h-full bg-menu-colors justify-between mt-0 pt-24 z-10">
      <div className="flex flex-row justify-around">
        <div className="project-links bg-alt-grey w-24 h-[1150px] flex flex-col items-center rounded-xl p-4 space-y-10 justify-top">
          <div>
            <a href={project.github_repo} target="_blank">
              <i className="fa-brands fa-github text-6xl pt-10"></i>
            </a>
          </div>
          <div>
            <a href={project.trello_link} target="_blank">
              <i className="fa-brands fa-trello text-6xl"></i>
            </a>
          </div>
          <div>
            <a href={project.figma_link} target="_blank">
              <i className="fa-brands fa-figma text-6xl mr-2"></i>
            </a>
          </div>
        </div>

        <div className="project-list bg-project-left-menu bg-alt-grey w-40 h-[1150px] flex flex-col items-center rounded-xl p-4 gap-y-7 justify-around">
          {rightMenuProjects.map((project) => {
            return (
              <ProjectIcon project={project} currentUser={currentUser.id} />
            );
          })}
        </div>
      </div>
    </div>
  );
};
