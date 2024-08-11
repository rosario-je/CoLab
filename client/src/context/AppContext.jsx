import React, { createContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const AppContext = createContext();

const ContextProvider = (props) => {
  const [notifications, setNotifications] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [techModal, setTechModal] = useState(false);
  const [requests, setRequests] = useState([]);
  const socket = useRef(null);

  /*------------------- Context block for Error Handling--------------*/
  const [error, setError] = useState(false);

  // Function to set the error
  const setAppError = (error) => {
    setError(error);
  };
  // Function to clear the error
  const clearAppError = () => {
    setError(null);
  };

  /*------------------- Context block for currentUser--------------*/
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (currentUser) {
          const response = await axios.get("/api/current-user");
          setCurrentUser(response.data);
          if (socket.current) {
            socket.current.emit("joinRoom", { userId: response.data.id });
          }
        }
      } catch (error) {
        console.error(
          "No user logged in:",
          error.response?.data || error.message
        );
      }
    };
    fetchCurrentUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      setCurrentUser(null);
    } catch (error) {
      console.error(
        "Error logging out:",
        error.response?.data || error.message
      );
    }
  };

  /*------------------- Context block for Modals--------------*/
  const handleTechStacksModal = () => {
    setTechModal(!techModal);
  };

  /*------------------- Context block for notifications--------------*/
  useEffect(() => {
    socket.current = io("http://localhost:8080");

    socket.current.on("connect", () => {
      console.log("Connected to server");
      if (currentUser) {
        socket.current.emit("joinRoom", { userId: currentUser.id });
      }
    });

    socket.current.on("receiveNotification", (notificationData) => {
      console.log("Received a new notification!: ", notificationData);
      setNotifications((prevNotifications) => [
        notificationData,
        ...prevNotifications,
      ]);
    });
    socket.current.on("receiveRequest", (requestData) => {
      console.log("Received a new join request: ", requestData);
      setRequests((prevRequests) => [requestData, ...prevRequests]);
    });

    const fetchNotifications = async () => {
      try {
        if (currentUser) {
          const notifList = await axios.get("/api/dashboard/notifications");
          setNotifications(notifList.data);
        }
      } catch (error) {
        console.error("Error in getting notifications: ", error.message);
      }
    };
    const fetchRequests = async () => {
      try {
        if (currentUser) {
          const requestList = await axios.get("/api/dashboard/manage_requests");
          setRequests(requestList.data);
        }
      } catch (error) {
        console.error("Error in getting requests: ", error.message);
      }
    };
    fetchNotifications();
    fetchRequests();

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

  /*------------------- Context block for join requests--------------*/

  const handleRequest = (requestId) => {
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== requestId)
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
      console.log("Request accepted: ", response.data.joinRequest.id);
      handleRequest(response.data.joinRequest.id);
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
      console.log("Request denied: ", response.data.data);
      handleRequest(response.data.data.id);
    } catch (error) {
      console.error("Error denying request: ", error.message);
    }
  };

  const providerValue = {
    notifications,
    currentUser,
    techModal,
    requests,
    error,
    setCurrentUser,
    setNotifications,
    handleDismiss,
    dismissNotif,
    handleLogout,
    setTechModal,
    handleTechStacksModal,
    setRequests,
    acceptRequest,
    denyRequest,
    setAppError,
    clearAppError
  };

  return (
    <AppContext.Provider value={providerValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, ContextProvider };
