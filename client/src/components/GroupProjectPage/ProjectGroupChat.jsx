import React, { useRef, useEffect } from "react";
import { ChatUserMessage } from "./ChatUserMessage";

export const ProjectGroupChat = ({ chat }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  return (
    <div className="chat-messages flex flex-col gap-y-8 justify-end ">
      {chat &&
        chat.map((message, index) => (
          <ChatUserMessage key={index} message={message} />
        ))}
      <div ref={chatEndRef} />
    </div>
  );
};
