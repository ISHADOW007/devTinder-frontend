import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { Link } from "react-router-dom";

const UserCommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserCommunities = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/userCommunity`, {
        withCredentials: true,
      });
      setCommunities(res.data);
    } catch (err) {
      console.error("Error fetching communities:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCommunities();
  }, []);

  const handleDelete = async (communityId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this community?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BASE_URL}/community/${communityId}`, {
        withCredentials: true,
      });
      setCommunities((prev) => prev.filter((c) => c._id !== communityId));
      alert("Community deleted successfully!");
    } catch (err) {
      console.error("Failed to delete community:", err);
      alert("Deletion failed");
    }
  };

  const handleDeleteAll = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete ALL your communities?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BASE_URL}/user/communities`, {
        withCredentials: true,
      });
      setCommunities([]);
      alert("All communities deleted successfully!");
    } catch (err) {
      console.error("Failed to delete all communities:", err);
      alert("Deletion failed");
    }
  };

  if (loading)
    return <p className="text-center text-lg mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">👥 Your Communities</h2>

      {communities.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t created or joined any communities yet.
        </p>
      ) : (
        <>
          <button
            onClick={handleDeleteAll}
            className="mb-6 bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-md transition"
          >
            🧹 Delete All My Communities
          </button>

          <div className="grid gap-6">
            {communities.map((c) => (
              <div
                key={c._id}
                className="border border-gray-200 shadow-md rounded-xl p-6 bg-white hover:shadow-lg transition-all duration-200"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-700">
                      {c.name}
                    </h3>
                    <p className="text-sm text-gray-500">{c.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-4">
                  <Link
                    to={`/communityChat/${c._id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition"
                  >
                    💬 Chat
                  </Link>
                  <Link
                    to={`/userCommunity/${c._id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm transition"
                  >
                    🔔 Requests
                  </Link>
                  <Link
                    to={`/community/${c._id}/members`}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition"
                  >
                    👤 Members
                  </Link>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserCommunityList;
