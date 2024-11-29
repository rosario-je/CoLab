import React, { useState } from "react";

export const ProjectUserAvatar = ({ participant, borderColorClass }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Function to get the first letter of the username
  const getFirstLetter = (username) => username.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col items-center justify-center text-text-color">
      {isHovered && <p>{participant.participant_username}</p>}
      <div
        className={`avatar w-20 h-20 flex items-center justify-center border-[3px] ${borderColorClass}`}
        key={participant.participant_id}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {participant.participant_pic ? (
          <img
            src={`/profile_pics/${participant.participant_pic}`}
            alt={`${participant.participant_username}'s Avatar`}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-3xl font-bold text-white bg-gray-500 w-full h-full flex items-center justify-center">
            {getFirstLetter(participant.participant_username)}
          </span>
        )}
      </div>
    </div>
  );
};
