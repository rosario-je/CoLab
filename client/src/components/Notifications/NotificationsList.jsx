import React, { useContext } from "react"; // Fixed import statement
import { AppContext } from "../../context/AppContext";
import { NotificationListItems } from "./NotificationsListItems.jsx";

export const NotificationsList = () => {
  const { notifications } = useContext(AppContext);

  return (
    <div className="my-notifications h-full w-auto flex flex-col items-center">
      <div className="flex bg-menu-colors fixed left-[300px] right-[300px] z-10 top-20 h-[65px] justify-start items-center">
        <h1 className="text-white text-2xl">My Notifications</h1>
      </div>
      <div className="flex flex-col w-full mt-16 items-center">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationListItems
              key={notification.id}
              notification_id={notification.id}
              message={notification.message}
            />
          )) // Added closing parenthesis here
        ) : (
          <p>No notifications available</p>
        )}
      </div>
    </div>
  );
};
