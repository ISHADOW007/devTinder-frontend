import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { BASE_URL } from "../utils/constants";
import { useParams } from "react-router-dom";

const CommunityMembers = () => {
  const { id: communityId } = useParams();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCommunity = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/communities/${communityId}/members`, {
        withCredentials: true,
      });
      setCommunity(res.data);
    } catch (err) {
      console.error("Failed to fetch community:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunity();
  }, []);

  const handleAction = async (targetUserId, action) => {
    try {
      let endpoint = "";
      if (action === "promote") {
        endpoint = `${BASE_URL}/communities/${communityId}/promote`;
      } else if (action === "demote") {
        endpoint = `${BASE_URL}/communities/${communityId}/demote`;
      } else if (action === "remove") {
        endpoint = `${BASE_URL}/communities/${communityId}/remove`;
      }

      await axios.put(endpoint, { userId: targetUserId }, { withCredentials: true });
      fetchCommunity();
    } catch (err) {
      console.error(`Failed to ${action} user:`, err);
    }
  };

  const isAdmin = (userId) => community?.admins?.some((admin) => admin._id === userId);
  const isCreator = (userId) => community?.creator?._id === userId;

  if (loading) return <p className="text-center p-4">Loading...</p>;
  if (!community) return <p className="text-center p-4">Community not found</p>;

  const creator = community.creator;
  const admins = community.admins.filter((user) => user._id !== creator._id);
  const members = community.members.filter(
    (user) =>
      user._id !== creator._id &&
      !admins.some((admin) => admin._id === user._id)
  );

  const renderUser = (user) => {
    const role = isCreator(user._id)
      ? "Creator"
      : isAdmin(user._id)
      ? "Admin"
      : "Member";

    return (
      <li
        key={user._id}
        className="p-4 bg-white border rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center justify-between"
      >
        {/* 👤 User Info */}
        <div>
          <p className="font-semibold text-lg flex gap-2 items-center">
            {user.firstName} {user.lastName}
            {user.isOnline ? (
              <span className="text-green-600 text-xs font-medium">● Online</span>
            ) : (
              <span
                className="text-gray-500 text-xs"
                title={`Last seen ${moment(user.lastSeen).format("LLL")}`}
              >
                Last seen {moment(user.lastSeen).fromNow()}
              </span>
            )}
          </p>
          <p className="text-sm text-gray-600">{user.emailId}</p>
          <span
            className={`inline-block mt-1 px-2 py-1 text-xs rounded font-medium ${
              role === "Creator"
                ? "bg-yellow-100 text-yellow-800"
                : role === "Admin"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {role}
          </span>
        </div>

        {/* ⚙️ Action Buttons */}
        {!isCreator(user._id) && (
          <div className="flex space-x-2 mt-4 sm:mt-0">
            {isAdmin(user._id) ? (
              <button
                onClick={() => handleAction(user._id, "demote")}
                className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
              >
                Demote
              </button>
            ) : (
              <button
                onClick={() => handleAction(user._id, "promote")}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              >
                Promote
              </button>
            )}
            <button
              onClick={() => handleAction(user._id, "remove")}
              className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
            >
              Remove
            </button>
          </div>
        )}
      </li>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Community Members</h2>

      {/* 👑 Creator */}
      <ul className="space-y-4 mb-6">{renderUser(creator)}</ul>

      {/* 🛡️ Admins */}
      {admins.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mb-4">Admins</h3>
          <ul className="space-y-4 mb-6">{admins.map((user) => renderUser(user))}</ul>
        </>
      )}

      {/* 👥 Members */}
      {members.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mb-4">Members</h3>
          <ul className="space-y-4">{members.map((user) => renderUser(user))}</ul>
        </>
      )}
    </div>
  );
};

export default CommunityMembers;
