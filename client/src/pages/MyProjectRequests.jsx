import React from "react";

import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components//UserRightMenuComponents/UserRightMenu";
import { Navbar } from "../components/Navbar";
import { JoinRequestList } from "../components/MyProjectRequests/JoinRequestList";

export const MyProjectRequests = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 mt-16">
        <UserLeftMenu />
        <div className="flex flex-col w-full h-full bg-project-background overflow-hidden pt-4">
          <div>
            <JoinRequestList/>
          </div>
        </div>
        <UserRightMenu />
      </div>
    </div>
  );
};
