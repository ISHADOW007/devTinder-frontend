import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(""); // 👈 default empty string
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  // 📩 Fetch past chat messages on component mount
  const fetchChatMessages = async () => {
    const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  // 🔌 Setup socket connection
  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((prev) => [...prev, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  // 🚀 Send message via socket
  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col bg-gray-900 text-white">
      <h1 className="p-5 border-b border-gray-600 text-xl font-semibold">Chat</h1>

      <div className="flex-1 overflow-y-scroll p-5 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              "chat " +
              (user.firstName === msg.firstName ? "chat-end" : "chat-start")
            }
          >
            <div className="chat-header">
              {`${msg.firstName} ${msg.lastName}`}
              <time className="text-xs opacity-50 ml-2">2 hours ago</time>
            </div>
            <div className="chat-bubble bg-blue-600 text-white">{msg.text}</div>
            <div className="chat-footer opacity-50">Seen</div>
          </div>
        ))}
      </div>

      {/* 👇 Input & Send button */}
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 bg-gray-800 text-white rounded p-2 outline-none"
        />
        <button
          onClick={sendMessage}
          className="btn btn-secondary bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>

      {/* 🐛 Debug helper (optional) */}
      {/* <p className="text-sm text-green-400 p-2">Typing: {newMessage}</p> */}
    </div>
  );
};

export default Chat;
