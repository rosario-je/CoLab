import { NotificationListItems } from "./NotificationsListItems";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";

export const NotificationsList = () => {
  const { notifications, fetchNotifications } = useContext(AppContext);

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="my-notifications h-full w-auto flex flex-col items-center">
      <div className="bg-menu-colors p-5 fixed w-full z-10 mx-auto">
        <h1 className="text-white text-2xl mx-72">Notifications</h1>
      </div>
      <div className="flex flex-col w-full mt-16 items-center">
        {notifications.map((notification) => {
          return (
            <NotificationListItems
              key={notification.id}
              notification_id={notification.id}
              message={notification.message}
            />
          );
        })}
      </div>
    </div>
  );
};
