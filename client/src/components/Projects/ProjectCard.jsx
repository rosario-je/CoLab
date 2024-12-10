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
  page,
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
  const { setNotifications, error, setAppError, clearAppError, config } =
    useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      listen("receiveNotification", (notificationData) => {
        //console.log("Received a new notification!: ", notificationData);
      });
    }
  }, []);

  const isOwner = owner_id === currentUserId;
  const isParticipant = participants.some(
    (participant) => participant.participant_id === currentUserId
  );

  const handleJoinRequest = async (e) => {
    e.preventDefault();
    try {
      const requestToJoin = await axios.post(
        `/api/projects/${project_id}/join`,
        config
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
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.patch(
        `/api/dashboard/projects/${project_id}/complete`,
        config
      );
      //console.log("Project marked as complete: ", response.data);
      fetchUserProjects();
    } catch (error) {
      console.error("Error completing project:", error.message);
    }
  };

  return (
    <div className="card bg-navbar-color my-5 md:my-8 md:w-full shadow-xl border-solid border-2 border-project-border/25 text-text-color/90 font-primary">
      <div className="card-body h-auto">
        <div className="top-project-card-container flex flex-col md:flex-row justify-between items-top mb-5">
          <div className="project-details-1 flex justify-start gap-x-2 md:gap-x-0 w-full md:w-[60%] md:space-x-4">
            <div className="self-center w-auto">
              <img
                src={
                  cover_photo_path ||
                  "https://staticg.sportskeeda.com/editor/2023/05/90701-16836967841966-1920.jpg"
                }
                alt="Project Cover"
                className="project-cover rounded-full md:rounded-xl object-cover  shadow-2xl border-2 border-text-color h-20 w-20 md:h-40 md:w-40 lg:h-36 lg:w-36 xl:h-40 xl:w-40"
              />
            </div>
            <div className="flex flex-col justify-evenly ">
              <h2 className="card-title tracking-tight font-bold text-[14px] md:text-2xl lg:text-xl xl:text-3xl">
                {name}
              </h2>
              {page === "myprojects" && isOwner ? (
                <div className="flex lg:flex-col lg:gap-y-5 gap-x-5 md:my-5 w-full">
                  {is_in_progress ? (
                    <>
                      <button
                        className="bg-icon-purple text-white text-base hover:bg-icon-purple-hover rounded-full w-20 md:w-[50%] lg:w-[150px] p-1 font-semibold"
                        onClick={() => {
                          navigate(
                            `/${currentUserId}/project/${project_id}/edit`
                          );
                        }}
                      >
                        <h1 className="text-sm md:text-base">Edit</h1>
                      </button>
                      <button
                        className="bg-icon-purple text-white text-base hover:bg-icon-purple-hover rounded-full w-20 md:w-[50%] lg:w-[150px] p-1 font-semibold"
                        onClick={handleCompleteProject}
                      >
                        <h3 className="text-sm md:text-base">Complete</h3>
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="font-semibold text-confirm md:text-lg md:ml-2 ">
                        Completed
                      </h3>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <h3 className="font-semibold md:mt-5 lg:mt-2 xl:mt-5">
                    <span className="text-icon-purple text-[12px] md:text-lg lg:text-xl">
                      Creator:{" "}
                    </span>
                    <span className="text-[12px] md:text-sm">@</span>
                    <span className="text-[12px] md:text-sm italic text-text-color/90">
                      {owner_username}{" "}
                    </span>
                  </h3>
                  {!is_in_progress && (
                    <h3 className="font-semibold text-confirm text-[12px] md:text-base lg:text-lg lg:mt-3">
                      Completed
                    </h3>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="avatar-group  md:-space-x-2 rtl:space-x-reverse w-full h-full justify-start md:w-2/5 lg:flex md:flex-wrap md:justify-end md:items-end self-end md:pb-10 lg:pb-5 pt-5 md:pt-0">
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
        <p className="font-light text-[12px] md:text-xl md:pt-5 lg:pt-2 mb-5 italic">
          {description}
        </p>
        <div className="flex card-actions w-full justify-between items-end">
          <div className="w-full lg:w-[60%] space-y-2 lg:space-y-5 pb-5 lg:pb-0">
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
                  className="projectCardBtn"
                >
                  <h3 className="projectCardBtnTxt">View Project</h3>
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
                <button onClick={handleJoinRequest} className="projectCardBtn">
                  <h3 className="projectCardBtnTxt">Request to Join</h3>
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
