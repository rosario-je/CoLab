import React from "react";
import { useNavigate } from "react-router-dom";

export const ProjectRightMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="w-96 text-text-color self-start  bg-menu-colors h-full flex gap-x-5 p-5 justify-between">
      <div className="to-do-list bg-project-left-menu w-full h-screen flex flex-col items-center rounded-xl p-4 space-y-56 justify-center">
        <div>
          <i className="fa-brands fa-github mr-2 text-8xl"></i>
        </div>
        <div>
          <i className="fa-brands fa-trello mr-2 text-8xl"></i>
        </div>
        <div>
          <i className="fa-brands fa-figma text-8xl mr-2"></i>
        </div>
      </div>

      <div className="to-do-list bg-project-left-menu w-56 h-screen flex flex-col items-center rounded-xl p-4 gap-y-7">
        <div className="bg-white w-20 h-20 rounded-2xl" />
        <div className="bg-white w-20 h-20 rounded-2xl" />
        <div className="bg-white w-20 h-20 rounded-2xl" />
        <div className="bg-white w-20 h-20 rounded-2xl" />
        <div className="bg-white w-20 h-20 rounded-2xl" />
        <div className="bg-white w-20 h-20 rounded-2xl" />
        <div className="bg-white w-20 h-20 rounded-2xl" />
        <div className="bg-white w-20 h-20 rounded-2xl" />
      </div>
    </div>
  );
};
