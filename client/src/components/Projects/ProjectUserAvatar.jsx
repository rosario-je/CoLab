import React from "react";

export const ProjectUserAvatar = (props) => {
  const { participant } = props;

  return (
    <div className="avatar" key={participant.participant_id}>
      <div className="w-12">
        <img
          src={`/profile_pics/${participant.participant_pic}`}
          alt="Participant Avatar"
        />
      </div>
    </div>
  );
};
  