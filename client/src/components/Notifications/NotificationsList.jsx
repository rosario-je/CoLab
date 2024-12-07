import React, { useContext } from "react"; // Fixed import statement
import { AppContext } from "../../context/AppContext";
import { NotificationListItems } from "./NotificationsListItems.jsx";

export const NotificationsList = () => {
  const { notifications } = useContext(AppContext);

  return (
    <div className="my-notifications h-full w-auto flex flex-col items-center lg:mx-72">
      <div className="flex bg-menu-colors fixed left-0 right-0 lg:left-[300px] lg:right-[300px] z-10 top-16 lg:top-20 h-[65px] justify-start items-center">
        <h1 className="text-white text-2xl w-full text-center">My Notifications</h1>
      </div>
      <div className="flex flex-col w-full px-5 mt-16 items-center">
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
