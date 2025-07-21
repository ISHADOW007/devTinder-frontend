// utils/socketManager.js
import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

let socketInstance = null;

export const createSocketConnection = (userId) => {
  if (!socketInstance) {
    socketInstance = io(BASE_URL, {
      transports: ["websocket"],
      reconnection: true,
    });

    // Send registration once connected
    socketInstance.on("connect", () => {
        console.log("satyagrao")
      socketInstance.emit("registerOnline", { userId });
    });

    // Optional: heartbeat
    setInterval(() => {
      socketInstance.emit("heartbeat");
    }, 60000);
  }

  return socketInstance;
};

export const getSocket = () => socketInstance;

export const disconnectSocketInstance = () => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
};
