import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const CommunityChatMessage = () => {
  const { id } = useParams(); // communityId from URL
  const communityId = id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!userId || !communityId) return;

    const socket = createSocketConnection();

    // Join community chat room
    socket.emit("joinCommunity", { userId, communityId });

    // 🔄 Normalize and set real-time messages
    socket.on("receiveCommunityMessage", (message) => {
      const normalized = message.sender
        ? message
        : {
            sender: {
              firstName: message.firstName,
              lastName: message.lastName,
            },
            content: message.text,
          };
      setMessages((prev) => [...prev, normalized]);
    });

    // 🔄 Fetch previous messages
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/community/${communityId}`, {
          withCredentials: true,
        });
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
    };

    fetchMessages();

    return () => {
      socket.disconnect();
    };
  }, [userId, communityId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();

    socket.emit("sendCommunityMessage", {
      communityId,
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col bg-gray-900 text-white">
      <h1 className="p-5 border-b border-gray-600 text-xl font-semibold">Community Chat</h1>

      {/* 💬 Chat Messages */}
      <div className="flex-1 overflow-y-scroll p-5 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              "chat " +
              (user.firstName === msg?.sender?.firstName ? "chat-end" : "chat-start")
            }
          >
            <div className="chat-header">
              {`${msg?.sender?.firstName || "User"} ${msg?.sender?.lastName || ""}`}
              <time className="text-xs opacity-50 ml-2">Just now</time>
            </div>
            <div className="chat-bubble bg-blue-600 text-white">
              {msg?.content || msg?.text || "No message"}
            </div>
            <div className="chat-footer opacity-50">Seen</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* ✍️ Input + Send */}
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 bg-gray-800 text-white rounded p-2 outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="btn btn-secondary bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CommunityChatMessage;
