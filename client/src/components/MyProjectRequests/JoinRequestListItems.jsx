import React from "react";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

export const JoinRequestListItems = ({
  project_id,
  requester_user_id,
  requester_username,
  project_name
}) => {

  const { acceptRequest, denyRequest } = useContext(AppContext);

  const handleAcceptClick = () => {
    acceptRequest(project_id, requester_user_id)
  };

  const handleDenyClick = () => {
    denyRequest(project_id, requester_user_id)};

  return (
    <>
      <div className="card bg-neutral text-neutral-content w-11/12 my-10">
        <div className="card-body items-center text-center flex flex-col justify-center gap-[20px]">
          <h2 className="requested-user self-start text-3xl font-semibold">
            {requester_username}
          </h2>

          <p className="self-start font-light text-3xl italic">
            Has requested to join:
          </p>

          <div className="card-actions w-full justify-between self-end">
            <h2 className="text-5xl font-bold">{project_name}</h2>
            <div className="flex justify-center items-center gap-[15px]">
              <button
                onClick={handleAcceptClick}
                className="btn bg-green hover:bg-dark-green text-white"
              >
                Accept
              </button>

              <button onClick={handleDenyClick} className="btn bg-red hover:bg-dark-red text-white">
                Deny
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
