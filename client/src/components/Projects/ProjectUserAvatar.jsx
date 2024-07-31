import React, { useState } from "react";

export const ProjectUserAvatar = ({ participant }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center">
      {isHovered && (
        <p>{participant.participant_username}</p>
      )}
      <div 
        className="avatar w-20" 
        key={participant.participant_id}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={`/profile_pics/${participant.participant_pic}`}
          alt={`${participant.participant_username}'s Avatar`}
        />
      </div>
    </div>
  );
};