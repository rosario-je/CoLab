import React, { useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ProjectUserAvatar } from "./ProjectUserAvatar";
import { ProjectTechStack } from "./ProjectTechStack";
import { OwnerProjectAvatar } from "./OwnerProjectAvatar";
import { useSocketManager } from "../../manage_sockets";
import { AppContext } from "../../context/AppContext";
import { UserErrorMessage } from "../AlertHandling/UserErrorMessage";

export const ProjectCard = ({
  currentUserId,
  project,
  fetchUserProjects,
  page
}) => {
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
    max_participants,
    github_repo,
    is_in_progress,
  } = project;

  const socket = useRef(null);
  const { listen, isConnected } = useSocketManager();
  const { setNotifications, error, setAppError, clearAppError } = useContext(AppContext);

  useEffect(() => {
    if (isConnected) {
      listen("receiveNotification", (notificationData) => {
        console.log("Received a new notification!: ", notificationData);
      });
    }
  }, []);

  const navigate = useNavigate();

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
      setNotifications((prevNotifications) => [
        requestToJoin.data.data.message,
        ...prevNotifications,
      ]);
    } catch (error) {
      setAppError(error.response.data);
      console.error("Error joining project:", error.message);
      setTimeout(() => {
        clearAppError();
      }, 2000);
    }
  };

  const handleCompleteProject = async () => {
    try {
      const response = await axios.patch(
        `/api/dashboard/projects/${project_id}/complete`
      );
      console.log("Project marked as complete: ", response.data);
      fetchUserProjects();
    } catch (error) {
      console.error("Error completing project:", error.message);
    }
  };

  return (
    <div className="card bg-navbar-color w-full shadow-xl border-solid border-2 border-project-border/25 text-text-color/90 my-8">
      <div className="card-body h-auto">
        <div className="top-project-card-container flex justify-between items-center mb-5">
          <div className="project-details-1 flex space-x-6">
            <img
              src={
                cover_photo_path ||
                "https://staticg.sportskeeda.com/editor/2023/05/90701-16836967841966-1920.jpg"
              } //<---online
              //src={`/project_pics/${cover_photo_path}`} // <---not online
              alt="Project Cover"
              className="project-cover rounded-xl object-cover h-40 w-40 shadow-2xl border-2 border-text-color"
            />
            <div className="flex flex-col justify-center">
              <h2 className="card-title font-bold text-4xl">{name}</h2>
              {page === "myprojects" && isOwner ? (
                <div className="flex flex-col gap-y-5 my-5 w-full">
                  {is_in_progress ? (
                    <>
                      <button
                        className="bg-icon-purple text-white text-base hover:bg-icon-purple-hover rounded-full w-[150px] p-1 font-semibold"
                        onClick={() => {
                          navigate(
                            `/${currentUserId}/project/${project_id}/edit`
                          );
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-icon-purple text-white text-base hover:bg-icon-purple-hover rounded-full w-[150px] p-1 font-semibold"
                        onClick={handleCompleteProject}
                      >
                        Complete
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="font-semibold text-confirm text-lg ml-2 ">
                        Completed
                      </h3>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <h3 className="font-semibold mt-5">
                    <span className="text-icon-purple text-xl">Creator: </span>@
                    <span className="text-base text-text-color/90">
                      {owner_username}{" "}
                    </span>
                  </h3>
                  {!is_in_progress && (
                    <h3 className="font-semibold text-confirm text-lg mt-3">
                      Completed
                    </h3>
                  )}
                </>
              )}
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
                    borderColorClass="border-navbar-color"
                  />
                )
            )}
          </div>
        </div>
        <p className="font-light text-xl pt-5 mb-5 italic">{description}</p>
        <div className="flex card-actions w-full justify-between items-center">
          <div className="w-[60%] space-y-5">
            {tech_requirements.map((tech, index) => (
              <ProjectTechStack key={index} tech={tech} />
            ))}
          </div>
          {isOwner || isParticipant ? (
            <>
              {is_in_progress ? (
                <button
                  onClick={() => {
                    navigate(`/${currentUserId}/project/${project_id}`);
                  }}
                  className="btn bg-website-purple hover:bg-website-purple-hover text-white text-base rounded-full"
                >
                  View Project
                </button>
              ) : (
                <div className="flex gap-x-2">
                  <button className="btn bg-icon-purple hover:bg-icon-purple-hover text-white text-base rounded-full">
                    <a href={`${github_repo}`} target="_blank">
                      Github Repo
                    </a>
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/${currentUserId}/project/${project_id}`)
                    }
                    className="btn bg-website-purple hover:bg-website-purple-hover text-white text-base rounded-full"
                  >
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
                  className="btn bg-website-purple hover:bg-website-purple-hover text-white text-base rounded-full"
                >
                  Request to Join
                </button>
              ) : (
                <button className="btn bg-icon-purple hover:bg-icon-purple-hover text-white text-base rounded-full">
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
                  className="btn bg-website-purple hover:bg-website-purple-hover text-white text-base rounded-full"
                  disabled
                >
                  Project Capacity: Full
                </button>
              ) : (
                <button className="btn bg-icon-purple hover:bg-icon-purple-hover text-white text-base rounded-full">
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
