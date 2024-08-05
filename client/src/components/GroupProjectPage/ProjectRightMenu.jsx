import React from "react";
import { useNavigate } from "react-router-dom";

export const ProjectRightMenu = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col fixed top-0 right-0 w-[300px] h-full bg-menu-colors justify-between mt-0 pt-24 z-10">
      <div className="flex flex-row justify-around">
        <div className="project-links bg-project-left-menu w-24 h-[1150px] flex flex-col items-center rounded-xl p-4 space-y-56 justify-center">
          <div>
            <a href={project.github_repo} target="_blank">
              <i className="fa-brands fa-github text-6xl"></i>
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

        <div className="project-list bg-project-left-menu w-24 h-[1150px] flex flex-col items-center rounded-xl p-4 gap-y-7 justify-around">
          <div className="bg-white w-16 h-16 rounded-2xl" />
          <div className="bg-white w-16 h-16 rounded-2xl" />
          <div className="bg-white w-16 h-16 rounded-2xl" />
          <div className="bg-white w-16 h-16 rounded-2xl" />
          <div className="bg-white w-16 h-16 rounded-2xl" />
          <div className="bg-white w-16 h-16 rounded-2xl" />
          <div className="bg-white w-16 h-16 rounded-2xl" />
          <div className="bg-white w-16 h-16 rounded-2xl" />
        </div>
      </div>
    </div>
  );
};
