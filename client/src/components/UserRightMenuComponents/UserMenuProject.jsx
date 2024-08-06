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
          className="rounded-full w-14 h-14"
          src={project.cover_photo_path}
          alt={project.name}
        />
        <h2 className="text-lg">{project.name}</h2>
      </a>
    </li>
  );
};

