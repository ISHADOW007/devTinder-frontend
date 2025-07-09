import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";

const UserCommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetChUserCommunityList = async () => {
    try {
      const res = await axios.get(BASE_URL + "/userCommunity", {
        withCredentials: true,
      });
      setCommunities(res.data); // Set the data
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
        <ul className="space-y-3">
          {communities.map((c) => (
            <li key={c._id} className="p-3 bg-gray-100 rounded shadow-sm">
              <h3 className="text-lg font-bold">{c.name}</h3>
              <p className="text-sm">{c.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserCommunityList;
