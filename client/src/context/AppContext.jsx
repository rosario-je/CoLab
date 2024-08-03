import React, { createContext, useState } from "react";
import axios from "axios";

const AppContext = createContext();

const ContextProvider = (props) => {
  // Context block for notifications
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const notifList = await axios.get("/api/dashboard/notifications");
      setNotifications(notifList.data);
      console.log("Notifications: ", notifList.data);
    } catch (error) {
      console.error("Error in getting notifications: ", error.message);
    }
  };

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
      // Refactor to remove when socket.io is implemented
      fetchNotifications();
    } catch (error) {
      console.error("Error dismissing notification", error.message);
    }
  };

  // Context block for join requests

  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const requestList = await axios.get("/api/dashboard/manage_requests");
      setRequests(requestList.data);
      console.log("Requests: ", requestList.data);
    } catch (error) {
      console.error("Error in getting requests: ", error.message);
    }
  };

  const handleRequestAcceptance = (acceptedRequestId) => {
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== acceptedRequestId)
    );
  };

  const acceptRequest = async (project_id, requester_user_id) => {
    try {
      const response = await axios.post(
        "/api/dashboard/manage_requests/approve_join_request",
        {
          project_id: project_id,
          requesting_user_id: requester_user_id,
        }
      );
      console.log("Request accepted: ", response.data);
      handleRequestAcceptance(response.data.id);
      // Refactor to remove when socket.io is implemented
      fetchRequests();
    } catch (error) {
      console.error("Error accepting request: ", error.message);
    }
  };

  const denyRequest = async (project_id, requester_user_id) => {
    try {
      const response = await axios.delete(
        "/api/dashboard/manage_requests/reject_join_request",
        {
          data: {
            project_id: project_id,
            requesting_user_id: requester_user_id,
          },
        }
      );
      console.log("Request denied: ", response.data);
      handleRequestAcceptance(response.data.id);
      // Refactor to remove when socket.io is implemented
      fetchRequests();
    } catch (error) {
      console.error("Error denying request: ", error.message);
    }
  };

  const providerValue = {
    notifications,
    fetchNotifications,
    handleDismiss,
    dismissNotif,
    requests,
    fetchRequests,
    handleRequestAcceptance,
    acceptRequest,
    denyRequest,
  };

  return (
    <AppContext.Provider value={providerValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, ContextProvider };
