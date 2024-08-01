import React from "react";

export const ProjectPageAvatars = (props) => {
  const { participant } = props;
  console.log(participant);
  return (
    <div>
      <div className="avatar">
        <div className="w-16 rounded-full border-blue-400 border-4">
          <img src={`/profile_pics/${participant.participant_pic}`} />
        </div>
      </div>
    </div>
  );
};
