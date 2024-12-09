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
  if (messageDate.toDateString() === now.toDateString()) {
    timeDescription = `Today at ${formatTime(messageDate)}`;
  } else if (
    messageDate.toDateString() ===
    new Date(now.setDate(now.getDate() - 1)).toDateString()
  ) {
    timeDescription = `Yesterday at ${formatTime(messageDate)}`;
  } else {
    timeDescription = `${formatDate(messageDate)} at ${formatTime(
      messageDate
    )}`;
  }

  return (
    <div className="chat chat-start px-4 font-primary">
      <div className="flex chat-image avatar h-full items-center">
        <div className="w-10 h-10 rounded-full items-center">
          {message.profile_pic ? (
            <img
              alt="Tailwind CSS chat bubble component"
              src={`/profile_pics/${message.profile_pic}`}
            />
          ) : (
            <div className="flex w-10 h-10 items-center justify-center bg-zinc-800 font-primary">
              <h2 className="font-extrabold">{message.username[0].toUpperCase()}</h2>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col chat-header text-text-color text-base gap-x-2">
        <div className="flex flex-row items-center gap-x-2">
          <h3 className="text-[13px] font-black ">{message.username}</h3>
          <time>
            <h5 className=" opacity-40 items-center text-[9px] font-light">
              {timeDescription}
            </h5>
          </time>
        </div>
        <div>
          <p className="text-[15px] md:text-lg text-zinc-300">
            {message.message}
          </p>
        </div>
      </div>
    </div>
  );
};
