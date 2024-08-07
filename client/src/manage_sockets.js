import React, { useState, useEffect, useRef, useCallback} from 'react';
import io from 'socket.io-client';
import { AppContext } from './context/AppContext'; // Adjust import as needed

export const useSocketManager = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:8080");

    socket.current.on("connect", () => {
      console.log("Connected to server");
      setIsConnected(true);
    });

    socket.current.on("disconnect", () => {
      console.log("Connected to server");
      setIsConnected(false);
    });

    // socket.current.on("receiveNotification", (newNotificationData) => {
    //   console.log("Received a new notification!: ", newNotificationData);
    //   setNotifications((prevNotifications) => [
    //     ...prevNotifications,
    //     newNotificationData,
    //   ]);
    //   setNewNotification(true); // Set the alert for new notifications
    // });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

const emit = useCallback((event, data) => {
    if (socket.current) {
      socket.current.emit(event, data);
    }
  }, [isConnected]);

const listen = useCallback((event, callback) => {
    if (socket.current) {
      socket.current.on(event, callback);
    }
  }, [isConnected]);

  return { emit, listen, isConnected };
};
