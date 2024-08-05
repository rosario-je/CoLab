import React, { useRef, useEffect } from "react";
import { ChatUserMessage } from "./ChatUserMessage";

export const ProjectGroupChat = ({ chat }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [chat]);

  return (
    <div className="chat-component flex flex-col-reverse h-full overflow-hidden bg-base-100">
      <div className="chat-messages flex flex-col-reverse overflow-y-auto h-full p-4">
        {chat &&
          chat.map((message, index) => (
            <ChatUserMessage key={index} message={message} />
          ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
