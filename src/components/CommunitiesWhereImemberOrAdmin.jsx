import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const CommunitiesWhereImemberOrAdmin = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyCommunities = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/communities/my`, {
        withCredentials: true,
      });
      setCommunities(res.data);
    } catch (err) {
      console.error("Failed to fetch communities:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCommunities();
  }, []);

  if (loading) return <p className="text-center p-4">Loading...</p>;
  if (communities.length === 0)
    return <p className="text-center p-4">You are not a member of any community.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Joined Communitie as member or admin</h2>
      <ul className="space-y-4">
        {communities.map((comm) => (
          <li
            key={comm._id}
            className="p-4 bg-white border rounded-lg shadow-sm flex flex-col md:flex-row justify-between md:items-center"
          >
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold">{comm.name}</h3>
              <p className="text-gray-600">{comm.description}</p>
              <p className="text-sm mt-1">
                Creator: {comm.creator.firstName} {comm.creator.lastName} (
                {comm.creator.emailId})
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-3">
              {/* Role badge */}
              <span
                className={`px-3 py-1 rounded text-white ${
                  comm.role === "Admin" ? "bg-blue-600" : "bg-gray-600"
                }`}
              >
                {comm.role}
              </span>

              {/* Chat button for all */}
              <button
                onClick={() => navigate(`/communityChat/${comm._id}`)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Chat
              </button>

              {/* Member List button only for Admin */}
              {comm.role === "Admin" && (
                <button
                  onClick={() => navigate(`/${comm._id}/whereIamAdminOrMembermembersList`)}
                  className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                >
                  Member List
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunitiesWhereImemberOrAdmin;
