import React from "react";
import { useNavigate } from "react-router-dom";

export const ProjectIcon = ({ project, currentUser }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/${currentUser}/project/${project.project_id}`)}
      className="tooltip tooltip-left"
      data-tip={project.name}
    >
      <img
        className="rounded-2xl w-24 h-24 object-cover border-4 border-website-purple hover:border-website-purple-hover"
        src={project.cover_photo_path}
        alt={project.name}
      />
    </div>
  );
};
