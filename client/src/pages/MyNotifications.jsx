import React, { useRef, useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components/UserRightMenuComponents/UserRightMenu";
import { Navbar } from "../components/Navbar";
import { NotificationsList } from "../components/Notifications/NotificationsList";

export const MyNotifications = ({ currentUser }) => {
  const [notifications, setNotifications] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:8080");

    socket.current.on("connect", () => {
      console.log("Connected to server");

      socket.current.emit("joinRoom", { userId: currentUser.id });
    });
    socket.current.on("receiveNotification", (newNotificationData) => {
      console.log("Received a new notification!: ", newNotificationData);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        newNotificationData,
      ]);
    });

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

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  const handleDismiss = (dismissedNotificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== dismissedNotificationId
      )
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar currentUser={currentUser} />
      <div className="flex flex-1 mt-16">
        <UserLeftMenu currentUser={currentUser} notifications={notifications}/>
        <div className="flex flex-col w-full h-full bg-project-background overflow-hidden pt-4">
          <div className="h-full mx-[300px]">
            <NotificationsList currentUser={currentUser} notifications={notifications} handleDismiss={handleDismiss}/>
          </div>
        </div>
        <UserRightMenu currentUser={currentUser} />
      </div>
    </div>
  );
};
