// src/components/QueueScreen.jsx
import React from "react";
import { FaSpinner } from "react-icons/fa";

const QueueScreen = ({ onMatchFound, isSearching }) => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Waiting for a Match...</h1>
      <FaSpinner className="animate-spin text-4xl mx-auto mb-4" />
      <button
        onClick={onMatchFound}
        disabled={isSearching}
        className={`px-6 py-2 rounded transition ${
          isSearching ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isSearching ? "Searching..." : "Join Queue"}
      </button>
    </div>
  );
};

export default QueueScreen;
