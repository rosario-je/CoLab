import React, { useContext } from "react"; // Fixed import statement
import { AppContext } from "../../context/AppContext";
import { NotificationListItems } from "./NotificationsListItems.jsx";

export const NotificationsList = () => {
  const { notifications } = useContext(AppContext);

  return (
    <div className="my-notifications h-full w-auto flex flex-col items-center lg:mx-48 2xl:mx-72">
      <div className="flex bg-menu-colors fixed left-0 right-0 lg:left-[200px] lg:right-[200px] 2xl:left-[300px] 2xl:right-[300px] z-10 top-16 lg:top-20 h-[45px] md:h-[65px] justify-start items-center">
        <h1 className="text-white text-xl md:text-base  w-full text-center">My Notifications</h1>
      </div>
      <div className="flex flex-col w-full px-5 mt-10 md:mt-20 items-center">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationListItems
              key={notification.id}
              notification_id={notification.id}
              message={notification.message}
            />
          )) // Added closing parenthesis here
        ) : (
          <p className="text-sm">No notifications available</p>
        )}
      </div>
    </div>
  );
};
