import React from "react";

import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components/UserRightMenuComponents/UserRightMenu";
import { Navbar } from "../components/Navbar";
import { NotificationsList } from "../components/Notifications/NotificationsList";

export const MyNotifications = ({ currentUser }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar currentUser={currentUser} />
      <div className="flex flex-1 mt-16">
        <UserLeftMenu currentUser={currentUser} />
        <div className="flex flex-col w-full h-full bg-project-background overflow-hidden pt-4">
          <div>
            <NotificationsList currentUser={currentUser} />
          </div>
        </div>
        <UserRightMenu currentUser={currentUser} />
      </div>
    </div>
  );
};
