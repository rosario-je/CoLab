import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import io from "socket.io-client";

//Context
import { AppContext } from "../../context/AppContext";

import { useNavigate } from "react-router-dom";

//Components
import { ProjectUserAvatar } from "../Projects/ProjectUserAvatar";
import { OwnerProjectAvatar } from "../Projects/OwnerProjectAvatar";
import { ProjectGroupChat } from "./ProjectGroupChat";
import { IoSend } from "react-icons/io5";

export const ProjectPageDetails = ({
  project,
  owner,
  handleCompleteProject,
}) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(project.chat);
  const [typingUsers, setTypingUsers] = useState([]);
  const { currentUser, config } = useContext(AppContext);

  const navigate = useNavigate();

  const isOwner = owner === currentUser.id;

  const socket = useRef(null);
  const typingTimeout = useRef(null);

  const {
    name,
    owner_id,
    owner_email,
    owner_pic,
    owner_username,
    participants,
    tech_requirements,
    project_id,
    cover_photo_path,
  } = project;

  const serverURL =
    import.meta.env.NODE_ENV === "development"
      ? import.meta.env.VITE_LOCAL_API_URL
      : import.meta.env.VITE_API_URL;

  useEffect(() => {
    socket.current = io(serverURL);

    socket.current.on("connect", () => {
      //console.log("Connected to server");
      socket.current.emit("joinProject", project_id);
    });

    socket.current.on("receiveMessage", (newMessageData) => {
      //console.log("Received message:", newMessageData);
      setChat((prevChat) => [...prevChat, newMessageData]);
    });

    socket.current.on("userTyping", ({ userId }) => {
      setTypingUsers((prevTypingUsers) => {
        if (!prevTypingUsers.includes(userId)) {
          return [...prevTypingUsers, userId];
        }
        return prevTypingUsers;
      });
    });

    socket.current.on("userStopTyping", ({ userId }) => {
      setTypingUsers((prevTypingUsers) => {
        return prevTypingUsers.filter((id) => id !== userId);
      });
    });

    if (project.chat) {
      setChat(project.chat);
    }

    return () => {
      socket.current.disconnect();
    };
  }, [project_id]);

  const handleMessage = async (event) => {
    if (message.trim() !== "") {
      try {
        const response = await axios.post(
          `/api/projects/${project_id}/chat`,
          {
            message,
          },
          config
        );
        const { newMessage } = response.data.data;

        socket.current.emit("sendMessage", {
          projectId: project_id,
          message: newMessage,
        });

        setMessage("");
        clearTimeout(typingTimeout.current);
        typingTimeout.current = setTimeout(() => {
          socket.current.emit("stopTyping", {
            projectId: project_id,
            userId: currentUser.username,
          });
        }, 2000);
      } catch (error) {
        console.error("Error sending the message", error.message);
      }
    }
  };

  const handleTyping = () => {
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    socket.current.emit("typing", {
      projectId: project_id,
      userId: currentUser.username,
    });

    typingTimeout.current = setTimeout(() => {
      socket.current.emit("stopTyping", {
        projectId: project_id,
        userId: currentUser.username,
      });
    }, 2000);
  };

  return (
    <div className="project-container flex flex-col grow lg:mt-3.5 bg-alt-grey/75">
      <div className="project-details-container flex flex-col xl:flex-row pb-2 md:pb-5 px-6 justify-between border-b-2 border-project-border/25 h-auto items-center backdrop-blur-xl bg-alt-grey/75 fixed top-16 md:top-20 z-10 left-0 right-0 lg:left-[200px] lg:right-[150px] xl:left-[200px] xl:right-[150px] 2xl:left-[300px] 2xl:right-[300px]">
        <div className="project-details w-full xl:w-auto flex flex-col md:flex-row space-y-2 md:gap-x-4 lg:gap-x-0 lg:space-x-10 lg:py-4 items-start">
          <div className="hidden lg:flex w-25 h-25">
            <img
              src={
                cover_photo_path ||
                "https://staticg.sportskeeda.com/editor/2023/05/90701-16836967841966-1920.jpg"
              }
              alt="project cover"
              className="rounded-lg w-20 h-auto md:w-32 lg:w-40 border-2 border-project-border"
            />
          </div>

          <div className="flex flex-col gap-y-2 lg:gap-y-6 justify-center">
            {name && (
              <div className="project-title">
                <h1 className="text-text-color/90 font-semibold md:text-2xl xl:text-4xl">
                  {name}
                </h1>
              </div>
            )}

            <div className="tech-stack flex flex-row flex-wrap justify-start gap-x-2 gap-y-2 lg:gap-x-6">
              {tech_requirements?.map((tech, index) => (
                <p
                  key={index}
                  className="rounded-full bg-website-purple text-white text-[10px] md:text-sm px-3.5 py-1"
                >
                  {tech}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="project-participants-avatars avatar-group xl:h-[150px] w-full xl:w-auto flex lg:flex-row flex-start md:justify-start gap-x-3 pt-3 lg:pt-0">
          <div className="h-full flex justify-center items-center pb-3 xl:pb-9">
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
                  key={participant.participant_id}
                  participant={participant}
                  borderColorClass={"border-alt-grey/75"}
                />
              ))}
            {isOwner && project.is_in_progress && (
              <div className="lg:hidden flex pl-4 h-full gap-x-2">
                <button
                  className="projectPageMobileBtn"
                  onClick={() => {
                    navigate(
                      `/${currentUser.id}/project/${project.project_id}/edit`
                    );
                  }}
                >
                  <h3 className="px-4 py-1 text-[10px]">Edit</h3>
                </button>
                <button
                  className="projectPageMobileBtn"
                  onClick={handleCompleteProject}
                >
                  <h3 className="px-4 py-1 text-[10px]">Complete</h3>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="chat-main-container relative flex flex-col flex-grow mt-[155px] mb-[65px] bg-alt-grey/75 h-full justify-end">
        <ProjectGroupChat chat={chat} />
        {typingUsers.length > 0 && (
          <div className="typing-indicator pl-12 pb-3.5 font-semibold text-base text-project-border">
            {typingUsers.join(", ")} {typingUsers.length > 1 ? "are" : "is"}{" "}
            typing...
          </div>
        )}
      </div>
      <div className="fixed bottom-0 w-full lg:w-auto lg:left-[200px] lg:right-[150px] xl:left-[200px] xl:right-[150px] 2xl:left-[300px] 2xl:right-[300px] z-20">
        <div className="flex message-input p-2 bg-project-background gap-x-2">
          <input
            onChange={(e) => {
              setMessage(e.target.value);
              handleTyping();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && message.trim() !== "") {
                handleMessage(e);
              }
            }}
            type="text"
            value={message}
            placeholder={`Send a message to ${name || "the project"}`}
            className={`input input-bordered text-base bg-alt-grey/75 text-project-border transition-all duration-500 ease-in-out ${
              message.length > 0 ? "w-[calc(100%-3rem)]" : "w-full"
            }`}
          />
          {message.length > 0 && (
            <button
              className="flex items-center justify-center rounded-full w-10 h-10 bg-blue-600 self-center transition-opacity duration-500 opacity-100"
              onClick={(e) => {
                handleMessage(e);
              }}
            >
              <IoSend className="mx-auto" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
