import React from "react";
import { JoinRequestListItems } from "./JoinRequestListItems";


export const JoinRequestList = () => {
  return (
    <div className="my-join-requests h-full w-auto flex flex-col items-center mx-72">
      {/* map through the component when database is populated */}
      <h1 className="text-white text-2xl">My Project Requests</h1>
      <JoinRequestListItems />
      <JoinRequestListItems />
      <JoinRequestListItems />
      <JoinRequestListItems />
    </div>
  );
};
