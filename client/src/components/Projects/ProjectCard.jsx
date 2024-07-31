import React from "react";
import axios from "axios";

import { ProjectUserAvatar } from "./ProjectUserAvatar";
import { ProjectTechStack } from "./ProjectTechStack";
import { OwnerProjectAvatar } from "./OwnerProjectAvatar";

export const ProjectCard = ({ currentUserId, project }) => {
  const {
    name,
    description,
    owner_id,
    owner_pic,
    owner_username,
    cover_photo_path,
    participants,
    tech_requirements,
    project_id,
    is_in_progress,
    max_participants,
    github_repo,
  } = project;

  const isOwner = owner_id === currentUserId;
  const isParticipant = participants.some(
    (participant) => participant.participant_id === currentUserId
  );

  const handleJoinRequest = async (e) => {
    e.preventDefault();
    try {
      const requestToJoin = await axios.post(
        `/api/projects/${project_id}/join`
      );
      console.log("Request to join:", requestToJoin.data);
    } catch (error) {
      console.error("Error joining project:", error.message);
    }
  };

  return (
    <div className="card bg-base-100 w-full shadow-xl border-solid border-2 border-website-purple/25 text-white my-8">
      <div className="card-body h-96">
        <div className="top-project-card-container flex justify-between items-center mb-5">
          <div className="project-details-1 flex space-x-6">
            <img
              src={`${cover_photo_path}`} //<---online
              //src={`/project_pics/${cover_photo_path}`} // <---not online
              alt="Project Cover"
              className="project-cover rounded-xl object-cover h-40 w-40 shadow-2xl border-2 "
            />
            <div className="flex flex-col justify-center">
              <h2 className="card-title font-bold text-4xl">{name}</h2>
              <h3 className="font-semibold mt-5">
                <span className="text-icon-purple text-xl">Creator:</span> @
                {owner_username}
              </h3>
            </div>
          </div>
          <div className="avatar-group -space-x-6 rtl:space-x-reverse w-2/5 flex justify-end items-end self-end pb-10">
            <OwnerProjectAvatar
              owner_username={owner_username}
              owner_pic={owner_pic}
              owner_id={owner_id}
            />
            {participants.map(
              (participant) =>
                participant.participant_id !== null && (
                  <ProjectUserAvatar
                    key={participant.participant_id}
                    participant={participant}
                  />
                )
            )}
          </div>
        </div>
        <p className="font-light text-xl pt-5 mb-5 italic">{description}</p>
        <div className="flex card-actions w-full justify-between items-center">
          <div className="w-[60%]">
            {tech_requirements.map((tech, index) => (
              <ProjectTechStack key={index} tech={tech} />
            ))}
          </div>
          {isOwner || isParticipant ? (
            <>
              {is_in_progress ? (
                <button className="btn bg-website-purple hover:bg-create text-white rounded-full">
                  View Project
                </button>
              ) : (
                <div className="flex gap-x-2">
                  <button className="btn bg-royal-blue hover:bg-racing-blue text-white rounded-full">
                    <a href={`${github_repo}`} target="_blank">
                      Github Repo
                    </a>
                  </button>

                  <button className="btn bg-website-purple hover:bg-create text-white rounded-full">
                    View Project
                  </button>
                </div>
              )}
            </>
          ) : participants.length < max_participants ? (
            <>
              {is_in_progress ? (
                <button
                  onClick={handleJoinRequest}
                  className="btn bg-website-purple hover:bg-create text-white rounded-full"
                >
                  Request to Join
                </button>
              ) : (
                <button className="btn bg-royal-blue hover:bg-racing-blue text-white rounded-full">
                  <a href={`${github_repo}`} target="_blank">
                    Github Repo
                  </a>
                </button>
              )}
            </>
          ) : (
            <>
              {is_in_progress ? (
                <button
                  className="btn bg-website-purple hover:bg-create text-white rounded-full"
                  disabled
                >
                  Project Capacity: Full
                </button>
              ) : (
                <button className="btn bg-royal-blue hover:bg-racing-blue text-white rounded-full">
                  <a href={`${github_repo}`} target="_blank">
                    Github Repo
                  </a>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
