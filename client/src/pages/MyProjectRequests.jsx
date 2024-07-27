import React from "react";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components/UserRightMenu";

import { RequestsNavbar } from "../components/MyProjectRequests/RequestsNavbar";
import { JoinRequestList } from "../components/MyProjectRequests/JoinRequestList";

export const MyProjectRequests = () => {  
  return(
    <div className="flex flex-col h-screen">
      <RequestsNavbar />
      <div className="flex flex-1 mt-16">
        <UserLeftMenu />
        <div className="flex flex-col w-full h-full bg-project-background overflow-hidden">
          <div>
            <JoinRequestList />
          </div>
        </div>
        <UserRightMenu />
      </div>
    </div>
  )
}