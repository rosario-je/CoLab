import React, { createContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
const AppContext = createContext();


const ContextProvider = (props) => {
  /*------------------- Context block for notifications--------------*/

  const [notifications, setNotifications] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
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
        if (currentUser) {
          const notifList = await axios.get("/api/dashboard/notifications");
          setNotifications(notifList.data);
          console.log("Notifications: ", notifList.data);
        }
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
  }, [currentUser]);

  const handleDismiss = (dismissedNotificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== dismissedNotificationId
      )
    );
  };

  const dismissNotif = async (notification_id) => {
    try {
      const response = await axios.delete(
        `/api/dashboard/notifications/${notification_id}`
      );
      console.log("Notification deleted: ", response.data);
      handleDismiss(notification_id); // Update state to reflect deletion
    } catch (error) {
      console.error("Error dismissing notification", error.message);
    }
  };

  // Context block for join requests

  // const [requests, setRequests] = useState([]);

  // const fetchRequests = async () => {
  //   try {
  //     const requestList = await axios.get("/api/dashboard/manage_requests");
  //     setRequests(requestList.data);
  //     console.log("Requests: ", requestList.data);
  //   } catch (error) {
  //     console.error("Error in getting requests: ", error.message);
  //   }
  // };

  // const handleRequestAcceptance = (acceptedRequestId) => {
  //   setRequests((prevRequests) =>
  //     prevRequests.filter((request) => request.id !== acceptedRequestId)
  //   );
  // };

  // const acceptRequest = async (project_id, requester_user_id) => {
  //   try {
  //     const response = await axios.post(
  //       "/api/dashboard/manage_requests/approve_join_request",
  //       {
  //         project_id: project_id,
  //         requesting_user_id: requester_user_id,
  //       }
  //     );
  //     console.log("Request accepted: ", response.data);
  //     handleRequestAcceptance(response.data.id);
  //     // Refactor to remove when socket.io is implemented
  //     fetchRequests();
  //   } catch (error) {
  //     console.error("Error accepting request: ", error.message);
  //   }
  // };

  // const denyRequest = async (project_id, requester_user_id) => {
  //   try {
  //     const response = await axios.delete(
  //       "/api/dashboard/manage_requests/reject_join_request",
  //       {
  //         data: {
  //           project_id: project_id,
  //           requesting_user_id: requester_user_id,
  //         },
  //       }
  //     );
  //     console.log("Request denied: ", response.data);
  //     handleRequestAcceptance(response.data.id);
  //     // Refactor to remove when socket.io is implemented
  //     fetchRequests();
  //   } catch (error) {
  //     console.error("Error denying request: ", error.message);
  //   }
  // };

  const providerValue = {
    notifications,
    currentUser,
    setCurrentUser,
    setNotifications,
    handleDismiss,
    dismissNotif,
  };

  return (
    <AppContext.Provider value={providerValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, ContextProvider };
