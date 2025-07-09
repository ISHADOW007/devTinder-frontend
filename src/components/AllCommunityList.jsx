import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

const AllCommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllCommunityList = async () => {
    try {
      const res = await axios.get(BASE_URL + "/allCommunityList", {
        withCredentials: true,
      });
      setCommunities(res.data); // Store the community list
    } catch (err) {
      console.error("Failed to fetch communities:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCommunityList();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">All Public Communities</h2>
      {loading ? (
        <p>Loading...</p>
      ) : communities.length === 0 ? (
        <p>No communities found.</p>
      ) : (
        <ul className="space-y-3">
          {communities.map((community) => (
            <li key={community._id} className="bg-gray-100 p-4 rounded shadow-sm">
              <h3 className="text-lg font-bold">{community.name}</h3>
              <p className="text-sm">{community.description}</p>
              <button
                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
                onClick={() => handleJoinCommunity(community._id)}
              >
                Join
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const handleJoinCommunity = async (communityId) => {
  try {
    await axios.post(`${BASE_URL}/communities/${communityId}/join`, {}, {
      withCredentials: true,
    });
    alert("Joined successfully!");
    // Optionally: redirect or refresh the list
  } catch (err) {
    alert("Join failed");
    console.error(err);
  }
};

export default AllCommunityList;
