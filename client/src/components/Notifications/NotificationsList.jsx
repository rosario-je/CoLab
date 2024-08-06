import React, { useEffect, useState } from "react";
import axios from "axios";
import { NotificationListItems } from "./NotificationsListItems";

export const NotificationsList = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notifList = await axios.get("/api/dashboard/notifications");
        setNotifications(notifList.data);
        console.log("Notifications: ", notifList.data);
      } catch (error) {
        console.error("Error in getting notifications: ", error.message);
      }
    };
    fetchNotifications();
  }, []);

  const handleDismiss = (dismissedNotificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== dismissedNotificationId
      )
    );
  };

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
