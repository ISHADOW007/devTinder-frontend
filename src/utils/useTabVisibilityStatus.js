import { useEffect } from "react";
import { getSocket } from "./socketManajer";

const useTabVisibilityStatus = (userId) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const socket = getSocket();
      if (!socket || !userId) return;

      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
            console.log("humm")
          socket.emit("registerOnline", { userId });
        } else {
          socket.emit("manualDisconnect", { userId });
          console.log("kkk")
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      handleVisibilityChange(); // Trigger once on mount
      clearInterval(interval); // Setup complete

      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }, 500); // Try every 0.5s until socket exists

    return () => clearInterval(interval);
  }, [userId]);
};

export default useTabVisibilityStatus;
