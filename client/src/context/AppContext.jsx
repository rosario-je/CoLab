import React, { createContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const AppContext = createContext();

const ContextProvider = (props) => {
  const [notifications, setNotifications] = useState([]);
  const [techModal, setTechModal] = useState(false);
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(false);
  const [token, setToken] = useState(null);
  const socket = useRef(null);

  const getUserData = (keys) =>
    keys.reduce((acc, key) => {
      acc[key] = localStorage.getItem(key);
      return acc;
    }, {});

  const { id, email, firstName, lastName, username, profile_pic } = getUserData(
    ["id", "email", "firstName", "lastName", "username", "profile_pic"]
  );

  
  const currentUser = {
    id,
    email,
    firstName,
    lastName,
    username,
    profile_pic,
  };
  
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  // Function to set the token
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  /*------------------- Context block for Error Handling--------------*/

  // Function to set the error
  const setAppError = (error) => {
    setError(error);
  };
  // Function to clear the error
  const clearAppError = () => {
    setError(null);
  };

  /*------------------- Context block for User Authentication--------------*/

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      setToken(null);
      localStorage.clear();
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

  const serverURL =
  import.meta.env.NODE_ENV === "development"
    ? import.meta.env.VITE_LOCAL_API_URL
    : import.meta.env.VITE_API_URL;

  /*------------------- Context block for notifications--------------*/
  useEffect(() => {
    socket.current = io(serverURL);

    socket.current.on("connect", () => {
      //console.log("Connected to server");
      if (token) {
        socket.current.emit("joinRoom", { userId: id });
      }
    });

    socket.current.on("receiveNotification", (notificationData) => {
      //console.log("Received a new notification!: ", notificationData);
      setNotifications((prevNotifications) => [
        notificationData,
        ...prevNotifications,
      ]);
    });
    socket.current.on("receiveRequest", (requestData) => {
      //console.log("Received a new join request: ", requestData);
      setRequests((prevRequests) => [requestData, ...prevRequests]);
    });

    const fetchNotifications = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        if (token) {
          const notifList = await axios.get(
            "/api/dashboard/notifications",
            config
          );
          setNotifications(notifList.data);
        }
      } catch (error) {
        console.error("Error in getting notifications: ", error.message);
      }
    };
    const fetchRequests = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        if (token) {
          const requestList = await axios.get(
            "/api/dashboard/manage_requests",
            config
          );
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
  }, [token]);

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
      //console.log("Notification deleted: ", response.data);
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
      // console.log("Request accepted: ", response.data.joinRequest.id);
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
      //console.log("Request denied: ", response.data.data);
      handleRequest(response.data.data.id);
    } catch (error) {
      console.error("Error denying request: ", error.message);
    }
  };

  const providerValue = {
    notifications,
    techModal,
    requests,
    error,
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
    clearAppError,
    token,
    setToken,
    currentUser,
    config,
  };

  return (
    <AppContext.Provider value={providerValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, ContextProvider };
