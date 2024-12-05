import React, { useState } from "react";

export const OwnerProjectAvatar = ({ owner, owner_username, owner_pic }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center">
      {isHovered && (
        <p className="username-item-hover p-2 text-icon-purple font-medium">
          {owner_username}
        </p>
      )}
      <div
        className="avatar w-12 h-12 md:w-14 md:h-14 lg:w-20  lg:h-20 border-icon-purple border-[3px] rounded-full flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {owner_pic ? (
          <img
            src={`/profile_pics/${owner_pic}`}
            alt={`${owner_username}'s Avatar`}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-3xl font-bold text-white bg-gray-500 w-full h-full flex items-center justify-center rounded-full">
            {owner_username && owner_username[0].toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
};
