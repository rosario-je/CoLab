import React from "react";
import { useNavigate } from "react-router-dom";

export const UserMenuProject = ({ project, currentUser }) => {
  const navigate = useNavigate();
    
  return (
    <li
      onClick={() => navigate(`/${currentUser}/project/${project.project_id}`)}
      className="group"
    >
      <a className="flex items-center">
        <img
          className="rounded-full lg:w-12 lg:h-12 2xl:w-14 2xl:h-14 border-2 border-project-border/25"
          src={project.cover_photo_path || "https://staticg.sportskeeda.com/editor/2023/05/90701-16836967841966-1920.jpg"}
          alt={project.name}
        />
        <h2 className="text-xs 2xl:text-lg">{project.name}</h2>
      </a>
    </li>
  );
};

