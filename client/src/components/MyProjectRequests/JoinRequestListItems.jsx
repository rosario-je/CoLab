import React from "react";
import axios from "axios";

export const JoinRequestListItems = ({
  project_id,
  requester_user_id,
  requester_username,
  project_name,
  onDecision,
}) => {
  const acceptRequest = async () => {
    try {
      const response = await axios.post(
        "/api/dashboard/manage_requests/approve_join_request",
        {
          project_id: project_id,
          requesting_user_id: requester_user_id,
        }
      );
      console.log("Request accepted: ", response.data);
      onDecision();
    } catch (error) {
      console.error("Error accepting request: ", error.message);
    }
  };

  const denyRequest = async () => {
    try {
      const response = await axios.delete(
        "/api/dashboard/manage_requests/reject_join_request",
        {
          data: {
            project_id: project_id,
            requesting_user_id: requester_user_id,
          },
        }
      );
      console.log("Request denied: ", response.data);
      onDecision();
    } catch (error) {
      console.error("Error denying request: ", error.message);
    }
  };

  return (
    <>
      <div className="card bg-navbar-color text-text-color w-11/12 my-10 border-2 border-project-border/25">
        <div className="card-body items-center text-center flex flex-col justify-center gap-[20px]">
          <h2 className="requested-user self-start text-2xl font-semibold">
            @{requester_username}
          </h2>

          <p className="self-start font-light text-2xl italic">
            Has requested to join:
          </p>

          <div className="card-actions w-full justify-between self-end">
            <h2 className="text-3xl font-bold">{project_name}</h2>
            <div className="flex justify-center items-center gap-[15px]">
              <button
                onClick={acceptRequest}
                className="btn bg-confirm hover:bg-confirm-light text-white rounded-full border-none text-base"
              >
                Accept
              </button>

              <button onClick={denyRequest} className="btn bg-reject hover:bg-reject-light text-white rounded-full text-base">
                Deny
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
