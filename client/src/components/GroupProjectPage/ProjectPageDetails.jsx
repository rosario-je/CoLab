import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import io from "socket.io-client";

import { AppContext } from "../../context/AppContext";
import { ProjectUserAvatar } from "../Projects/ProjectUserAvatar";
import { OwnerProjectAvatar } from "../Projects/OwnerProjectAvatar";
import { ProjectGroupChat } from "./ProjectGroupChat";

export const ProjectPageDetails = ({ project }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(project.chat);
  const [typingUsers, setTypingUsers] = useState([]);
  const { currentUser } = useContext(AppContext);

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

  console.log("project", project);

  useEffect(() => {
    socket.current = io("https://colab-server-y33a.onrender.com");

    socket.current.on("connect", () => {
      console.log("Connected to server");
      socket.current.emit("joinProject", project_id);
    });

    socket.current.on("receiveMessage", (newMessageData) => {
      console.log("Received message:", newMessageData);
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
    if (event.key === "Enter" && message.trim() !== "") {
      try {
        const response = await axios.post(`/api/projects/${project_id}/chat`, {
          message,
        });
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
    <div className="project-container flex flex-col grow mt-3.5 bg-alt-grey/75">
      <div className="project-details-container flex flex-row px-6 justify-between border-b-2 border-project-border/25 h-auto items-center  backdrop-blur-xl bg-alt-grey/75 fixed  top-20 z-10 left-[300px] right-[300px]">
        <div className="project-details flex flex-row space-x-10 py-4">
          <img
            src={
              cover_photo_path ||
              "https://staticg.sportskeeda.com/editor/2023/05/90701-16836967841966-1920.jpg"
            }
            alt="project cover"
            className="rounded-lg w-40 border-2 border-project-border"
          />

          <div className="flex flex-col gap-y-6 justify-center">
            {name && (
              <div className="project-title">
                <h1 className="text-text-color/90 font-semibold text-4xl">
                  {name}
                </h1>
              </div>
            )}
            <div className="tech-stack flex flex-row justify-start gap-x-6">
              {tech_requirements &&
                tech_requirements.map((tech, index) => (
                  <p
                    key={index}
                    className="rounded-full bg-website-purple text-white text-sm px-3.5 py-1"
                  >
                    {tech}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="h-[150px] project-participants-avatars avatar-group flex flex-row flex-start gap-x-3">
          <div className="h-full flex justify-center items-end pb-9">
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
          </div>
        </div>
      </div>
      <div className="chat-main-container relative flex flex-col flex-grow mt-[155px] mb-20 bg-alt-grey/75 h-full justify-end">
        <ProjectGroupChat chat={chat} />
        {typingUsers.length > 0 && (
          <div className="typing-indicator pl-12 pb-3.5 font-semibold text-base text-project-border">
            {typingUsers.join(", ")} {typingUsers.length > 1 ? "are" : "is"}{" "}
            typing...
          </div>
        )}
      </div>
      <div className="fixed bottom-0 left-[300px] right-[300px] z-20">
        <div className="message-input w-full py-4 px-11 bg-project-background">
          <input
            onChange={(e) => {
              setMessage(e.target.value);
              handleTyping();
            }}
            onKeyDown={handleMessage}
            type="text"
            value={message}
            placeholder={`Send a message to ${name || "the project"}`}
            className="input input-bordered w-full bg-alt-grey/75 text-project-border text-base"
          />
        </div>
      </div>
    </div>
  );
};
