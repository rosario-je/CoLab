import React from "react";
import { ProjectUserAvatar } from "../Projects/ProjectUserAvatar";

import { OwnerProjectAvatar } from "../Projects/OwnerProjectAvatar";

export const ProjectPageDetails = ({ project }) => {
  const {
    name,
    cover_photo_path,
    description,
    figma_link,
    github_repo,
    owner_email,
    owner_pic,
    owner_username,
    participants,
    tech_requirements,
  } = project;

  return (
    <div className="project-chat-details-container flex grow h-40 flex-col mt-3.5">
      <div className="flex flex-row w-full p-9 justify-between border-b-2 border-slate-700 h-full items-center">
        {name && (
          <div className="project-title">
            <h1 className="text-white font-3xl font-light text-3xl">{name}</h1>
          </div>
        )}
        <div className="tech-stack flex flex-row justify-around gap-x-8">
          {tech_requirements &&
            tech_requirements.map((tech, index) => (
              <p
                key={index}
                className="rounded-full bg-website-purple px-3.5 py-1"
              >
                {tech}
              </p>
            ))}
        </div>
        <div className="project-participants-avatars avatar-group flex flex-row flex-end gap-x-3">
          <OwnerProjectAvatar
            owner={owner_email}
            owner_username={owner_username}
            owner_pic={owner_pic}
          />
          {participants &&
            participants.length > 0 &&
            participants.map((participant) => (
              <ProjectUserAvatar
                key={participant.id}
                participant={participant}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
