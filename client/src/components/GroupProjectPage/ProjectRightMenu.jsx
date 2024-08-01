import React from "react";
import { useNavigate } from "react-router-dom";

export const ProjectRightMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="w-72 text-text-color self-start project bg-menu-colors h-full fixed right-0 z-10 top-20 p-5 gap-x-5 flex flex-col justify-between">
      <div className="flex flex-row justify-around">
        <div className="project-links bg-project-left-menu w-24 h-[1150px] flex flex-col items-center rounded-xl p-4 space-y-56 justify-center">
          <div>
            <i className="fa-brands fa-github text-6xl"></i>
          </div>
          <div>
            <i className="fa-brands fa-trello text-6xl"></i>
          </div>
          <div>
            <i className="fa-brands fa-figma text-6xl mr-2"></i>
          </div>
        </div>

        <div className="project-list bg-project-left-menu w-24 h-[1150px] flex flex-col items-center rounded-xl p-4 gap-y-7">
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
