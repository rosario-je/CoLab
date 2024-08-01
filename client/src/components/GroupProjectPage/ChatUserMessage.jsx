import React from "react";

export const ChatUserMessage = ({ message }) => {
  const messageDate = new Date(message.created_at);
  const now = new Date();

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutesFormatted} ${ampm}`;
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };


  let timeDescription;
  if (
    messageDate.toDateString() === now.toDateString()
  ) {
    timeDescription = `Today at ${formatTime(messageDate)}`;
  } else if (
    messageDate.toDateString() ===
    new Date(now.setDate(now.getDate() - 1)).toDateString() 
  ) {
    timeDescription = `Yesterday at ${formatTime(messageDate)}`;
  } else {
    timeDescription = `${formatDate(messageDate)} at ${formatTime(messageDate)}`;
  }

  return (
    <div className="chat chat-start py-4 pl-10">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={`/profile_pics/${message.profile_pic}`}
          />
        </div>
      </div>
      <div className="chat-header font-semibold mb-2">
        {message.username}
        <time className="text-xs opacity-50 pl-3">{timeDescription}</time>
      </div>
      <div className="chat-bubble">{message.message}</div>
    </div>
  );
};
