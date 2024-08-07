// manage_sockets.js
import { useState, useEffect, useRef, useCallback } from 'react';
import socket from './socket'; // Import the shared socket instance

export const useSocketManager = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      setIsConnected(false);
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const emit = useCallback((event, data) => {
    if (socket) {
      socket.emit(event, data);
    }
  }, [isConnected]);

  const listen = useCallback((event, callback) => {
    if (socket) {
      socket.on(event, callback);
    }
  }, [isConnected]);

  return { emit, listen, isConnected };
};
