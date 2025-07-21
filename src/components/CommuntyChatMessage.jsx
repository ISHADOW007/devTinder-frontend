import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import { BASE_URL } from "../utils/constants";

const CommunityChatMessage = () => {
  const { id: communityId } = useParams();
  const user = useSelector((store) => store.user);
  const socket = useSelector((store) => store.socket.instance);

  const userId = user?._id;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    if (!socket || !userId || !communityId) return;

    socket.emit("joinCommunity", { userId, communityId });

    socket.on("receiveCommunityMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("messageDeleted", ({ messageId }) => {
      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    });

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
      socket.off("receiveCommunityMessage");
      socket.off("messageDeleted");
    };
  }, [socket, userId, communityId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim() || !socket) return;

    socket.emit("sendCommunityMessage", {
      communityId,
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      text: newMessage,
    });

    setNewMessage("");
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("uFile", file);
      const res = await axios.post(`${BASE_URL}/cloud/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      const imageUrl = res.data.secure_url || res.data.url;

      socket.emit("sendCommunityMessage", {
        communityId,
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        fileUrl: imageUrl,
        fileName: file.name,
        messageType: "image",
      });
    } catch (err) {
      console.error("Upload failed", err);
    }
    setUploading(false);
  };

  const deleteMessage = (messageId) => {
    socket.emit("deleteCommunityMessage", { messageId, userId });
  };

  const toggleSelectMessage = (msgId) => {
    setSelectedMessages((prev) =>
      prev.includes(msgId)
        ? prev.filter((id) => id !== msgId)
        : [...prev, msgId]
    );
  };

  const handleDeleteSelected = () => {
    selectedMessages.forEach((msgId) => deleteMessage(msgId));
    setSelectedMessages([]);
    setShowDropdown(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto border border-gray-600 m-5 h-[75vh] flex flex-col bg-gray-900 text-white rounded shadow-lg">
      {/* Header with three-dot button */}
      <div className="p-4 border-b border-gray-700 text-xl font-semibold bg-gray-800 flex justify-between items-center relative">
        <span>Community Chat</span>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-white text-xl px-2 py-1 hover:text-blue-400"
            title="More options"
          >
            ⋮
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 bg-gray-800 border border-gray-700 rounded shadow-lg z-50 w-44 text-sm">
              <button
                onClick={handleDeleteSelected}
                disabled={selectedMessages.length === 0}
                className={`block w-full text-left px-3 py-1.5 text-white hover:bg-red-600 rounded-t ${
                  selectedMessages.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                🗑 Delete Selected
              </button>
              <button
                onClick={() => {
                  setSelectedMessages([]);
                  setShowDropdown(false);
                }}
                className="block w-full text-left px-3 py-1.5 text-white hover:bg-gray-700 rounded-b"
              >
                ❌ Cancel Selection
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isMine = userId === msg?.sender?._id;
          const isSelected = selectedMessages.includes(msg._id);

          return (
            <div
              key={msg._id}
              className={`flex ${isMine ? "justify-end" : "justify-start"} relative`}
              onClick={() => toggleSelectMessage(msg._id)}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded cursor-pointer border-2 transition-all duration-200 ${
                  isSelected ? "border-yellow-400 scale-105" : "border-transparent"
                } ${isMine ? "bg-blue-600 rounded-br-none" : "bg-green-600 rounded-bl-none"}`}
              >
                <div className="text-xs font-semibold mb-1 select-text truncate">
                  {msg?.sender?.firstName} {msg?.sender?.lastName}
                </div>

                {msg.messageType === "image" && msg.fileUrl ? (
                  <img
                    src={msg.fileUrl}
                    alt="sent"
                    className="rounded max-w-full max-h-40"
                    loading="lazy"
                  />
                ) : (
                  <p className="whitespace-pre-wrap break-words text-sm line-clamp-3">
                    {msg.content || msg.text}
                  </p>
                )}

                <time className="block text-xs text-gray-300 mt-1 text-right select-none">
                  {moment(msg.createdAt).fromNow()}
                </time>

                {!isSelected && isMine && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMessage(msg._id);
                    }}
                    title="Delete message"
                    className="absolute top-1 right-1 text-gray-300 hover:text-red-400 transition text-sm"
                    aria-label="Delete message"
                  >
                    🗑
                  </button>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-4 border-t border-gray-700 flex items-center gap-2 bg-gray-800">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 bg-gray-700 text-white rounded px-4 py-2"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="fileInput"
          disabled={uploading}
        />
        <label
          htmlFor="fileInput"
          className={`cursor-pointer bg-blue-700 px-3 py-2 rounded hover:bg-blue-800 ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          📎
        </label>
        <button
          onClick={sendMessage}
          className="bg-blue-700 px-4 py-2 rounded text-white hover:bg-blue-800"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default CommunityChatMessage;
