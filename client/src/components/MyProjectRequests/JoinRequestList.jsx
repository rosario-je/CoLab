import { JoinRequestListItems } from "./JoinRequestListItems";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect } from "react";

export const JoinRequestList = () => {
  const { requests, fetchRequests } = useContext(AppContext);

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="my-join-requests h-full w-auto flex flex-col items-center mx-72">
      <div className="bg-menu-colors p-5 fixed w-full z-10 mx-auto">
        <h1 className="text-white text-2xl mx-72">My Project Requests</h1>
      </div>
      <div className="flex flex-col w-full items-center mt-16">
        {requests.map((request) => {
          return (
            <JoinRequestListItems
              key={request.id}
              requester_username={request.requester_username}
              project_name={request.project.name}
              requester_user_id={request.user_id}
              project_id={request.project.id}
            />
          );
        })}
      </div>
    </div>
  );
};
