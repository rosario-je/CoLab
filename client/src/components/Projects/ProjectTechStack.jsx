import React from "react";

export const ProjectTechStack = (props) => {
  const { tech } = props;
  return (
    <div className="badge bg-website-purple text-white px-3 py-4 mx-1 w-auto text-base">
      <h3 className="font-primary text-[13px] md:text-base">{tech}</h3>
    </div>
  );
};
