import React from "react";
import { ProjectPageAvatars } from "./ProjectPageAvatars";
import { ProjectInspoBoard } from "./ProjectInspoBoard";

export const ProjectPageDetails = () => {
  return (
    <div className="project-chat-details-container flex grow h-32  flex-col">
      <div className="flex flex-row w-full p-9 justify-between items-center border-b-2 border-slate-700">
        <div className="project-title ">
          <h1 className="text-white font-3xl font-light text-3xl">
            Project Name
          </h1>
        </div>
        <div className="tech-stack flex flex-row justify-around gap-x-8">
          <p className="rounded-full bg-website-purple px-3.5 py-1">ReactJS</p>
          <p className="rounded-full bg-website-purple px-3.5 py-1">MongoDB</p>
          <p className="rounded-full bg-website-purple px-3.5 py-1">NodeJS</p>
          <p className="rounded-full bg-website-purple px-3.5 py-1">
            TailwindCSS
          </p>
        </div>
        <div className="project-participants-avatars flex flex-row flex-end gap-x-3">
          <ProjectPageAvatars />
          <ProjectPageAvatars />
          <ProjectPageAvatars />
          <ProjectPageAvatars />
        </div>
      </div>
      <ProjectInspoBoard />
    </div>
  );
};
