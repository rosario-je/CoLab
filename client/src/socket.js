import { io } from 'socket.io-client';

const socket = io("https://colab-server-fqr4.onrender.com");

export default socket;
