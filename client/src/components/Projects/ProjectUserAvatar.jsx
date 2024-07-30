import React, { useState } from "react";

export const ProjectUserAvatar = (props) => {
  const { participant } = props;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="flex flex-col w-[19%] items-center justify-center">
      <div className="tooltip flex justify-center items-center rounded-sm">
        <p className="px-2 flex flex-col">{isHovered && participant.participant_username}</p>
      </div>
      <div className="avatar mt-2" key={participant.participant_id}>
        <div
          className="w-11"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={`/profile_pics/${participant.participant_pic}`}
            alt="Participant Avatar"
          />
        </div>
      </div>
    </div>
  );
};
