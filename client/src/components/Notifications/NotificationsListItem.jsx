import React from "react";
import axios from "axios";

export const JoinRequestListItems = ({
  project_id,
  requester_user_id,
  requester_username,
  project_name,
  onAccept
}) => {

  const acceptRequest = async () => {
    try {
      const response = await axios.post("/api/projects/approve_join_request", {
        project_id: project_id,
        requesting_user_id: requester_user_id,
      });
      console.log("Request accepted: ", response.data);
      onAccept();

    } catch (error) {
      console.error("Error accepting request: ", error.message);
    }
  };

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
                onClick={acceptRequest}
                className="btn bg-green hover:bg-dark-green text-white"
              >
                Accept
              </button>

              <button className="btn bg-red hover:bg-dark-red text-white">
                Deny
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};