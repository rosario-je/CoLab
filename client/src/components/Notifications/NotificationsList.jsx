import React from "react";
import { NotificationListItems } from "./NotificationsListItems";

export const NotificationsList = ({ currentUser, notifications, handleDismiss }) => {
  return (
    <div className="my-notifications h-full w-auto flex flex-col items-center">
      <div className="flex bg-menu-colors fixed left-[300px] right-[300px] z-10 top-20 h-[65px] justify-start items-center">
        <h1 className="text-white text-2xl">My Notifications</h1>
      </div>
      <div className="flex flex-col w-full mt-16 items-center">
        {notifications.map((notification) => {
          return (
            <NotificationListItems
              key={notification.id}
              notification_id={notification.id}
              message={notification.message}
              onDesicion={() => handleDismiss(notification.id)}
            />
          );
        })}
      </div>
    </div>
  );
};
