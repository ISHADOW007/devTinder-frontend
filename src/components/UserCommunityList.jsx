import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { Link } from "react-router-dom";

const UserCommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetChUserCommunityList = async () => {
    try {
      const res = await axios.get(BASE_URL + "/userCommunity", {
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
    fetChUserCommunityList();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Communities</h2>
      {communities.length === 0 ? (
        <p>No communities joined yet.</p>
      ) : (
        <ul className="space-y-4">
          {communities.map((c) => (
            <li key={c._id} className="p-4 bg-white border rounded-lg shadow-sm">
              <h3 className="text-lg font-bold">{c.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{c.description}</p>

              <div className="flex gap-2">
                <Link
                  to={`/chat/${c._id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Start Chat
                </Link>
                <Link
                  to={`/userCommunity/${c._id}`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Requests
                </Link>
                <Link
                  to={`/community/${c._id}/members`}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Members
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserCommunityList;
