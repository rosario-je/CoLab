import React from "react";
import { ProjectUserAvatar } from "../Projects/ProjectUserAvatar";

import { OwnerProjectAvatar } from "../Projects/OwnerProjectAvatar";
import { ProjectGroupChat } from "./ProjectGroupChat";

export const ProjectPageDetails = ({ project }) => {
  const {
    name,
    cover_photo_path,
    description,
    figma_link,
    github_repo,
    owner_id,
    owner_email,
    owner_pic,
    owner_username,
    participants,
    tech_requirements,
    chat,
  } = project;

  console.log(tech_requirements);

  return (
    <div className="project-chat-details-container flex flex-col grow mt-3.5">
      <div className="flex flex-row w-full px-9 justify-between border-b-2 border-slate-700 h-auto items-center fixed pr-[650px] z-10 backdrop-blur-xl bg-project-left-menu/30">
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
        <div className="h-[150px] project-participants-avatars avatar-group flex flex-row flex-start gap-x-3">
          <div className="h-full flex justify-center items-end pb-7">
          <OwnerProjectAvatar
            key={owner_id}
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
      <div className="chat-main-container relative flex-grow mt-32 mb-16">
        <ProjectGroupChat chat={chat}/>
      </div>
      <div className="fixed bottom-0 left-[300px] right-[300px] z-20">
        <div className="message-input w-full py-4 px-11 bg-project-background">
          <input
            type="text"
            placeholder={`Send a message to ${name || "the project"}`}
            className="input input-bordered w-full"
          />
        </div>
      </div>
    </div>
  );
};
