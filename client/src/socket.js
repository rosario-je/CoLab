import { io } from 'socket.io-client';

const socket = io("https://colab-server-y33a.onrender.com");

export default socket;
