import React, { useEffect, useState } from "react";
import axios from "axios";
import { JoinRequestListItems } from "./JoinRequestListItems";

export const JoinRequestList = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requestList = await axios.get("/api/dashboard/manage_requests");
        setRequests(requestList.data);
        console.log("Requests: ", requestList.data);
      } catch (error) {
        console.error("Error in getting requests: ", error.message);
      }
    };
    fetchRequests();
  }, []);

  const handleRequestAcceptance = (acceptedRequestId) => {
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== acceptedRequestId)
    );
  };

  return (
    <div className="my-join-requests h-full w-auto flex flex-col items-center mx-72">
      <div className="flex bg-menu-colors fixed left-[300px] right-[300px] z-10 top-20 h-[65px] justify-start items-center">
        <h1 className="text-white text-2xl">My Project Requests</h1>
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
              onDecision={() => handleRequestAcceptance(request.id)}
            />
          );
        })}
      </div>
    </div>
  );
};
