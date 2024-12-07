import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export const JoinRequestListItems = ({
  requester_username,
  project_name,
  requester_user_id,
  project_id,
}) => {
  const { acceptRequest, denyRequest } = useContext(AppContext);

  const handleAcceptRequest =  () => {
    acceptRequest(project_id, requester_user_id);
  };

  const handleDenyRequest = () => {
    denyRequest(project_id, requester_user_id);
  };

  return (
    <>
      <div className="card bg-navbar-color text-text-color/90 w-full my-10 border-2 border-project-border/25">
        <div className="card-body items-center text-center flex flex-col justify-center gap-[20px]">
          <h2 className="requested-user self-start lg:text-2xl font-semibold">
            @{requester_username}
          </h2>

          <p className="self-start font-light lg:text-2xl italic">
            Has requested to join:
          </p>

          <div className="card-actions w-full justify-between self-end">
            <h2 className="text-start text-xl lg:text-3xl font-bold pb-3 lg:pb-0">{project_name}</h2>
            <div className="flex justify-center items-center gap-[15px]">
              <button
                onClick={handleAcceptRequest}
                className="btn bg-confirm hover:bg-confirm-light text-white rounded-full border-none text-base"
              >
                Accept
              </button>

              <button
                onClick={handleDenyRequest}
                className="btn bg-reject hover:bg-reject-light text-white rounded-full text-base"
              >
                Deny
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
