import { io } from 'socket.io-client';

const socket = io("https://colab-server-gs6a.onrender.com");

export default socket;
