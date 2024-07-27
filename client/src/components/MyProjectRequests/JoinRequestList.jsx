import React from "react";
import { JoinRequestListItems } from "./JoinRequestListItems";

export const JoinRequestList = () => {
  return (
    <div className="my-join-requests h-full w-auto flex flex-col items-center mx-72">
      {/* map through the component when database is populated */}
      <div className="bg-menu-colors p-5 fixed w-full z-10 mx-auto">
        <h1 className="text-white text-2xl mx-72">My Project Requests</h1>
      </div>
      <div className="flex flex-col w-full items-center mt-16">
        <JoinRequestListItems />
        <JoinRequestListItems />
        <JoinRequestListItems />
        <JoinRequestListItems />
      </div>
    </div>
  );
};
