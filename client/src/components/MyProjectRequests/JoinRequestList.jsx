import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { JoinRequestListItems } from "./JoinRequestListItems";

export const JoinRequestList = () => {
  const { requests } = useContext(AppContext);
  console.log("Current requests: ", requests); // Check requests in console

  return (
    <div className="my-join-requests h-full w-auto flex flex-col items-center mx-72">
      <div className="flex bg-menu-colors fixed left-[300px] right-[300px] z-10 top-20 h-[65px] justify-start items-center">
        <h1 className="text-white text-2xl">My Project Requests</h1>
      </div>
      <div className="flex flex-col w-full items-center mt-16">
        {requests.length > 0 ? (
          requests.map((request) => (
            <JoinRequestListItems
              key={request.id}
              requester_username={request.requester_username}
              project_name={request.project_name}
              requester_user_id={request.user_id}
              project_id={request.project_id}
            />
          ))
        ) : (
          <p>No requests available</p>
        )}
      </div>
    </div>
  );
};
