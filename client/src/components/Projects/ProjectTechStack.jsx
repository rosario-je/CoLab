import React from "react";

export const ProjectTechStack = (props) => {
  const { tech } = props;
  return (
    <div className="badge bg-website-purple text-white px-5 py-4 mx-1 w-auto">
      {tech}
    </div>
  );
};
