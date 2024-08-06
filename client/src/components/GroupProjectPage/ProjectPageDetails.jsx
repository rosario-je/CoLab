import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import { ProjectUserAvatar } from "../Projects/ProjectUserAvatar";
import { OwnerProjectAvatar } from "../Projects/OwnerProjectAvatar";
import { ProjectGroupChat } from "./ProjectGroupChat";

export const ProjectPageDetails = ({ project, fetchProject }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(project.chat);
  const socket = useRef(null);

  console.log(chat);

  const {
    name,
    owner_id,
    owner_email,
    owner_pic,
    owner_username,
    participants,
    tech_requirements,
    project_id,
  } = project;

  useEffect(() => {
    socket.current = io("http://localhost:8080");

    socket.current.on("connect", () => {
      console.log("Connected to server");
      socket.current.emit("joinProject", project_id);
    });

    socket.current.on("receiveMessage", (newMessageData) => {
      console.log("Received message:", newMessageData);
      setChat((prevChat) => [...prevChat, newMessageData]);
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
      } catch (error) {
        console.error("Error sending the message", error.message);
      }
    }
  };

  return (
    <div className="project-container flex flex-col grow mt-3.5">
      <div className="project-details-container flex flex-row px-6 justify-between border-b-2 border-project-border/25 h-auto items-center  backdrop-blur-xl bg-project-left-menu/30 fixed  top-20 z-10 left-[300px] right-[300px]">
        <div className="flex flex-col gap-y-6">
          {name && (
            <div className="project-title">
              <h1 className="text-text-color font-semibold text-4xl">{name}</h1>
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
                  borderColorClass={"border-alt-grey/75"}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="chat-main-container relative flex-grow mt-[155px] mb-20 bg-alt-grey/75">
        <ProjectGroupChat chat={chat} />
      </div>
      <div className="fixed bottom-0 left-[300px] right-[300px] z-20">
        <div className="message-input w-full py-4 px-11 bg-project-background">
          <input
            onChange={(e) => setMessage(e.target.value)}
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
