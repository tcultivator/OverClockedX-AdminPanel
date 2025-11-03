// lib/socket.ts
import { io, Socket } from "socket.io-client";

// Use your deployed server URL
const SOCKET_URL = "https://socket-io-server-1-wa2a.onrender.com";

export const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"], // ensures WebSocket is used
  autoConnect: true,         // automatically connect
});

// Optional: debug connection
socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("Socket disconnected:", reason);
});
