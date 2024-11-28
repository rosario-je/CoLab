import { io } from 'socket.io-client';

const serverURL = import.meta.env.NODE_ENV === "development"
  ? import.meta.env.VITE_LOCAL_API_URL
  : import.meta.env.VITE_API_URL;

const socket = io(serverURL);

export default socket;
