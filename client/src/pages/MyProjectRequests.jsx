import React from "react";
import { RequestsNavbar } from "../components/RequestsNavbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components/UserRightMenu";
import { JoinRequestList } from "../components/JoinRequestList";

export const MyProjectRequests = () => {  
  return(
    <div className="flex flex-col h-screen">
      <RequestsNavbar />
      <div className="flex flex-1 mt-16">
        <UserLeftMenu />
        <div className="flex flex-col w-full h-full bg-project-background overflow-hidden">
          <div className="flex-grow flex flex-col justify-center items-center h-full">
            <div className="w-full flex justify-start items-center py-1 bg-menu-colors h-[75px]">
            <h1 className="text-white text-2xl">My Project Requests</h1>
            </div>
            <JoinRequestList />
          </div>
        </div>
        <UserRightMenu />
      </div>
    </div>
  )
}