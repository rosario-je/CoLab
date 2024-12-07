import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { JoinRequestListItems } from "./JoinRequestListItems";

export const JoinRequestList = () => {
  const { requests } = useContext(AppContext);
  return (
    <div className="my-join-requests h-full w-auto flex flex-col items-center lg:mx-72">
      <div className="flex bg-menu-colors fixed left-0 right-0 lg:left-[300px] lg:right-[300px] z-10 top-16 lg:top-20 h-[65px] justify-start items-center">
        <h1 className="text-white text-2xl w-full text-center">My Project Requests</h1>
      </div>
      <div className="flex flex-col w-full px-5 mt-16 items-center">
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
