import React, { useState } from "react";

export const OwnerProjectAvatar = ({ owner, owner_username, owner_pic }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center">
      {isHovered && (
        <p className="username-item-hover p-2 text-icon-purple">
          {owner_username}
        </p>
      )}
      <div
        className="avatar w-20 border-icon-purple border-[3px] rounded-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={`/profile_pics/${owner_pic}`}
          alt={`${owner_username}'s Avatar`}
        />
      </div>
    </div>
  );
};
