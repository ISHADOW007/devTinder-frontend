// src/components/MatchRoom.jsx
import React, { useEffect, useRef, useState } from "react";
import Timer from "./Timer";
import { toast } from "sonner";

const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

const MatchRoom = ({ onLeave, roomId, partnerId, socket }) => {
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const pc = useRef(null);
  const [stream, setStream] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const start = async () => {
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(localStream);
        if (localVideo.current) localVideo.current.srcObject = localStream;

        pc.current = new RTCPeerConnection(configuration);

        // Add local tracks
        localStream.getTracks().forEach((track) =>
          pc.current.addTrack(track, localStream)
        );

        // Handle remote stream
        pc.current.ontrack = (event) => {
          console.log("🎥 Remote stream received");
          if (remoteVideo.current) {
            remoteVideo.current.srcObject = event.streams[0];
          }
        };

        // Emit ICE candidates
        pc.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("signal", {
              roomId,
              data: { type: "candidate", candidate: event.candidate },
            });
          }
        };

        // Initiator sends offer
        if (socket.id > partnerId) {
          const offer = await pc.current.createOffer();
          await pc.current.setLocalDescription(offer);
          socket.emit("signal", { roomId, data: offer });
        }

        // Watch connection state
        pc.current.onconnectionstatechange = () => {
          const state = pc.current.connectionState;
          console.log("🔁 Peer state:", state);
          if (state === "connected") {
            setIsConnected(true);
          } else if (["disconnected", "failed", "closed"].includes(state)) {
            toast.warning("⚠️ Disconnected from partner.");
            onLeave();
          }
        };
      } catch (err) {
        console.error("getUserMedia error:", err);
        toast.error("Camera/Mic error: " + err.message);
        onLeave();
      }
    };

    start();

    return () => {
      stream?.getTracks().forEach((t) => t.stop());
      if (localVideo.current) localVideo.current.srcObject = null;
      if (remoteVideo.current) remoteVideo.current.srcObject = null;
      pc.current?.close();
      setIsConnected(false);
    };
  }, []);

  useEffect(() => {
    const candidateQueue = [];
    let remoteDescSet = false;

    socket.on("signal", async ({ from, data }) => {
      if (!pc.current) return;

      try {
        if (data.type === "offer") {
          await pc.current.setRemoteDescription(new RTCSessionDescription(data));
          remoteDescSet = true;
          const answer = await pc.current.createAnswer();
          await pc.current.setLocalDescription(answer);
          socket.emit("signal", { roomId, data: answer });

          // Apply queued candidates
          for (const candidate of candidateQueue) {
            await pc.current.addIceCandidate(candidate);
          }
          candidateQueue.length = 0;

        } else if (data.type === "answer") {
          await pc.current.setRemoteDescription(new RTCSessionDescription(data));
          remoteDescSet = true;

          // Apply queued candidates
          for (const candidate of candidateQueue) {
            await pc.current.addIceCandidate(candidate);
          }
          candidateQueue.length = 0;

        } else if (data.type === "candidate") {
          const iceCandidate = new RTCIceCandidate(data.candidate);
          if (remoteDescSet && pc.current.remoteDescription) {
            await pc.current.addIceCandidate(iceCandidate);
          } else {
            console.log("🕗 Queuing ICE candidate...");
            candidateQueue.push(iceCandidate);
          }
        }
      } catch (err) {
        console.error("❌ Error handling signal:", err);
      }
    });

    socket.on("partnerLeft", () => {
      toast.error("🚪 Your partner has left the match.");
      onLeave();
    });

    return () => {
      socket.off("signal");
      socket.off("partnerLeft");
    };
  }, [socket]);

  const endMatch = () => {
    socket.emit("leaveMatch");
    toast.info("👋 You left the match.");
    onLeave();
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-2">
        {isConnected ? "✅ Connected!" : "🔗 Connecting..."}
      </h1>
      <Timer duration={180} onTimeUp={endMatch} />
      <div className="flex justify-center gap-6 my-4 flex-wrap">
        <div>
          <p className="mb-2">Your Video</p>
          <video
            ref={localVideo}
            autoPlay
            muted
            playsInline
            controls
            className="rounded w-full max-w-xs bg-black"
          />
        </div>
        <div>
          <p className="mb-2">Partner Video</p>
          <video
            ref={remoteVideo}
            autoPlay
            muted
            playsInline
            controls // temporary for debugging
            className="rounded w-full max-w-xs bg-black"
          />
        </div>
      </div>
      <button
        onClick={endMatch}
        className="bg-red-600 px-6 py-2 rounded hover:bg-red-700"
      >
        Leave Match
      </button>
    </div>
  );
};

export default MatchRoom;
