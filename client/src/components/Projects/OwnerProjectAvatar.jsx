import React, { useState } from "react";

export const OwnerProjectAvatar = (props) => {
  const { owner, owner_username, owner_pic } = props;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  return (
    <div className="flex flex-col w-[19%] items-center justify-center">
      <div className="tooltip block justify-center items-center rounded-md mt-5">
        <p className="px-2 w-[55px] text-royal-yellow flex justify-center items-center">{isHovered && `${owner_username}`}</p>
      </div>
      <div className="avatar" key={owner}>
        <div
          className="w-14 border-royal-yellow border-[3px] rounded-full drop-shadow-yellow-glow"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={`/profile_pics/${owner_pic}`}
            alt="Owner Avatar"
          />
        </div>
      </div>
    </div>
  );
};
