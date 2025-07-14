// src/pages/SpeedMatch.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import QueueScreen from "../src/components/QueueScreen";
import MatchRoom from "../src/components/MatchRoom";
import { io } from "socket.io-client";
import { toast } from "sonner";

const SERVER_URL = "http://localhost:7777";

const SpeedMatch = () => {
  const [socket, setSocket] = useState(null);
  const [inMatch, setInMatch] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [partnerId, setPartnerId] = useState(null);
  const [isInitiator, setIsInitiator] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const searchingToastId = useRef();

  const handleLeave = useCallback(() => {
    setInMatch(false);
    setRoomId(null);
    setPartnerId(null);
    setIsInitiator(false);
    setIsSearching(false);
  }, []);

  useEffect(() => {
    const s = io(SERVER_URL);
    setSocket(s);

    s.on("connect", () => {
      console.log("Socket connected:", s.id);
    });

    s.on("matchFound", ({ roomId, partnerId, isInitiator }) => {
      if (searchingToastId.current) toast.dismiss(searchingToastId.current);

      setRoomId(roomId);
      setPartnerId(partnerId);
      setIsInitiator(isInitiator);
      setInMatch(true);
      setIsSearching(false);

      toast.success("🎉 Match Found! Connecting you...");
    });

    s.on("disconnect", handleLeave);

    return () => s.disconnect();
  }, [handleLeave]);

  const joinQueue = () => {
    if (!socket || isSearching) return;

    setIsSearching(true);
    searchingToastId.current = toast.loading("🔍 Looking for a match...");
    socket.emit("joinQueue");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      {!inMatch ? (
        <QueueScreen onMatchFound={joinQueue} isSearching={isSearching} />
      ) : (
        <MatchRoom
          socket={socket}
          roomId={roomId}
          partnerId={partnerId}
          isInitiator={isInitiator}
          onLeave={handleLeave}
        />
      )}
    </div>
  );
};

export default SpeedMatch;
