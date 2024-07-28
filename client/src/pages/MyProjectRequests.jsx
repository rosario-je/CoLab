import React from "react";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components/UserRightMenu";

import { RequestsNavbar } from "../components/MyProjectRequests/RequestsNavbar";
import { JoinRequestList } from "../components/MyProjectRequests/JoinRequestList";

export const MyProjectRequests = ({ currentUser, handleCoLabHome }) => {
  return (
    <div className="flex flex-col h-screen">
      <RequestsNavbar handleCoLabHome={handleCoLabHome} currentUser={currentUser} />
      <div className="flex flex-1 mt-16">
        <UserLeftMenu currentUser={currentUser} />
        <div className="flex flex-col w-full h-full bg-project-background overflow-hidden">
          <div>
            <JoinRequestList currentUser={currentUser} />
          </div>
        </div>
        <UserRightMenu currentUser={currentUser} />
      </div>
    </div>
  );
};
