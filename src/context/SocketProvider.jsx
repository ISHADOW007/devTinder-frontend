// context/SocketProvider.jsx
import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { BASE_URL } from "../utils/constants";

export const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const currentUser = useSelector((state) => state.user);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (currentUser?._id) {
      const newSocket = io(BASE_URL, {
        query: { userId: currentUser._id },
        transports: ["websocket"],
        reconnection: true,
      });

      setSocket(newSocket);
      console.log("🔌 Socket connected");

      // Heartbeat every 60s
      const heartbeatInterval = setInterval(() => {
        newSocket.emit("heartbeat");
      }, 60000);

      return () => {
        clearInterval(heartbeatInterval);
        newSocket.disconnect();
        console.log("❌ Socket disconnected");
      };
    }
  }, [currentUser?._id]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
