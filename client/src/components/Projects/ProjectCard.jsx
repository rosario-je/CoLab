import React from "react";
import { ProjectUserAvatar } from "./ProjectUserAvatar";
import { ProjectTechStack } from "./ProjectTechStack";

export const ProjectCard = (props) => {
  const { name, description, owner, participants, techStack, currentUserId } =
    props;

  const isOwner = owner === currentUserId;
  const isParticipant = participants.some(
    (participant) => participant.participant_id === currentUserId
  );

  return (
    <>
      <div className="card bg-base-100 w-full shadow-xl border-solid border-2 border-website-purple/25 text-white my-8">
        <div className="card-body h-96">
          <div className="flex justify-between items-center text-white">
            <div className="project-details-1 flex space-x-6">
              <div className="w-28 h-28 bg-white rounded-3xl" />
              <div className="flex flex-col justify-center">
                <h2 className="card-title font-bold text-4xl">{name}</h2>
                <h3>@{owner.username}</h3>
              </div>
            </div>
            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
              {participants.map((participant) => {
                return (
                  <ProjectUserAvatar
                    key={participant.participant_id}
                    participant={participant}
                  />
                );
              })}
            </div>
          </div>
          <p className="font-light text-xl pt-5">{description}</p>
          <div className="flex card-actions w-full justify-between items-center ">
            <div className="w-[60%]">
              {techStack.map((tech, index) => {
                return <ProjectTechStack key={index} tech={tech} />;
              })}
            </div>
            {isOwner || isParticipant ? (
              <button className="btn bg-website-purple hover:bg-create text-white rounded-full">
                View Project
              </button>
            ) : (
              <button className="btn bg-website-purple hover:bg-create text-white rounded-full">
                Request to Join
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
