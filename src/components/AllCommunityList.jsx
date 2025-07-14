import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { useSelector } from 'react-redux';

const AllCommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.user);
  const userId = user?._id;

  const fetchAllCommunityList = async () => {
    try {
      const res = await axios.get(BASE_URL + "/allCommunityList", {
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
    fetchAllCommunityList();
  }, []);

  const handleJoinCommunity = async (communityId) => {
    try {
      await axios.post(
        `${BASE_URL}/communities/${communityId}/request-to-join`,
        {},
        { withCredentials: true }
      );
      alert("Join request sent!");
      fetchAllCommunityList(); // Refresh the list
    } catch (err) {
      alert("Join request failed");
      console.error(err);
    }
  };

  // ✅ Final Status Logic
  const getJoinStatus = (community) => {
    if (community.members.includes(userId)) return "member";

    const pendingReq = community.joinRequests.find(
      (r) => r.user === userId && r.status === "pending"
    );
    if (pendingReq) return "pending";

    return "not_requested";
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">🌐 All Public Communities</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : communities.length === 0 ? (
        <p className="text-center">No communities found.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {communities.map((community) => {
            const status = getJoinStatus(community);

            return (
              <div
                key={community._id}
                className="bg-white border rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-blue-800">{community?.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {community.description || "No description"}
                </p>

                <div className="mt-4 text-sm text-gray-700">
                  <p>
                    👤 <span className="font-medium">Creator:</span>{" "}
                    {community?.creator?.firstName} {community?.creator?.lastName}
                  </p>
                  <p>📧 {community?.creator?.emailId}</p>
                </div>

                {/* JOIN BUTTON */}
                <div className="mt-4">
                  {status === "member" ? (
                    <button className="bg-green-600 text-white px-4 py-2 rounded cursor-default" disabled>
                      ✅ Already a Member
                    </button>
                  ) : status === "pending" ? (
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded cursor-default" disabled>
                      ⏳ Request Pending Approval
                    </button>
                  ) : (
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                      onClick={() => handleJoinCommunity(community._id)}
                    >
                      ➕ Request to Join
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllCommunityList;
