import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserCommunityRequests = () => {
  const { id: communityId } = useParams();
  const [requests, setRequests] = useState([]);

  const fetchUserCommunityRequests = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/communities/${communityId}/allJoin-requests-forCreator`,
        { withCredentials: true }
      );
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch join requests", err);
    }
  };

  const handleDecision = async (requestId, status) => {
    try {
      await axios.post(
        `${BASE_URL}/communities/${communityId}/handleJoinRequest`,
        { requestId, status },
        { withCredentials: true }
      );
      fetchUserCommunityRequests(); // refresh list after decision
    } catch (err) {
      console.error(`Failed to ${status} request`, err);
    }
  };

  useEffect(() => {
    fetchUserCommunityRequests();
  }, [communityId]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Join Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500">No join requests found.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li
              key={req._id}
              className="bg-white border border-gray-200 shadow-sm p-4 rounded-xl flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold">
                  {req.user?.firstName} {req.user?.lastName}
                </p>
                <p className="text-sm text-gray-500">{req.user?.emailId}</p>
                <p className="mt-1 text-sm">
                  Status: <span className="font-medium">{req.status}</span>
                </p>
              </div>

              {req.status === "pending" ? (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDecision(req._id, "accepted")}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecision(req._id, "rejected")}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-md ${
                    req.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {req.status}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserCommunityRequests;
