import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import moment from "moment";

const AllCommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all"); // all / public / private
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const user = useSelector((state) => state.user);
  const userId = user?._id;

  const fetchAllCommunityList = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        search,
        page,
        limit: 10,
      };
      if (typeFilter !== "all") {
        // send isPublic param as boolean for filtering
        params.isPublic = typeFilter === "public";
      }

      const res = await axios.get(`${BASE_URL}/allCommunityList`, {
        params,
        withCredentials: true,
      });
      setCommunities(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch communities:", err);
    } finally {
      setLoading(false);
    }
  }, [search, page, typeFilter]);

  useEffect(() => {
    // Debounce search/filter changes
    const handler = setTimeout(() => {
      setPage(1); // reset to page 1 on new search/filter
      fetchAllCommunityList();
    }, 500);
    return () => clearTimeout(handler);
  }, [search, typeFilter, fetchAllCommunityList]);

  useEffect(() => {
    // Fetch on page change without resetting page (no debounce)
    if (page !== 1) fetchAllCommunityList();
  }, [page, fetchAllCommunityList]);

  const handleJoinCommunity = async (community) => {
    try {
      const endpoint = community.isPublic
        ? `${BASE_URL}/communities/${community._id}/join-direct`
        : `${BASE_URL}/communities/${community._id}/request-to-join`;

      await axios.post(endpoint, {}, { withCredentials: true });

      alert(
        community.isPublic
          ? "🎉 You joined the community!"
          : "⏳ Join request sent!"
      );
      fetchAllCommunityList();
    } catch (err) {
      alert("❌ Failed to join community");
      console.error(err);
    }
  };

  const getJoinStatus = (community) => {
    if (community.members.includes(userId)) return "member";

    const pendingReq = community.joinRequests?.find(
      (r) => r.user === userId && r.status === "pending"
    );
    if (pendingReq) return "pending";

    return "not_requested";
  };

  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-white p-5 rounded-xl shadow-md animate-pulse"
          aria-busy="true"
          aria-label="Loading community"
        >
          <Skeleton height={25} width={200} />
          <Skeleton height={15} width={`60%`} className="mt-2" />
          <Skeleton height={15} width={`80%`} className="mt-2" />
          <div className="mt-4 space-y-1">
            <Skeleton height={14} width={`50%`} />
            <Skeleton height={14} width={`40%`} />
            <Skeleton height={14} width={`30%`} />
          </div>
          <Skeleton height={36} width={150} className="mt-4" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">🌐 All Communities</h2>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search communities by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <select
          className="w-full md:w-1/3 mt-3 md:mt-0 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All Communities</option>
          <option value="public">Public Communities</option>
          <option value="private">Private Communities</option>
        </select>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : communities.length === 0 ? (
        <p className="text-center">No communities found.</p>
      ) : (
        <>
          <div className="flex flex-col gap-6">
            {communities.map((community) => {
              const status = getJoinStatus(community);
              const creator = community.creator;

              return (
                <div
                  key={community._id}
                  className="bg-white border rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-blue-800">
                      {community?.name}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        community.isPublic
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {community.isPublic ? "Public" : "Private"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mt-1">
                    {community.description || "No description"}
                  </p>

                  <div className="mt-4 text-sm text-gray-700 space-y-1">
                    <p>
                      👤 <span className="font-medium">Creator:</span>{" "}
                      {creator
                        ? `${creator.firstName} ${creator.lastName}`
                        : "Unknown"}
                    </p>
                    <p>📧 {creator?.emailId || "N/A"}</p>
                    <p>
                      📅 <span className="font-medium">Created:</span>{" "}
                      {moment(community.createdAt).format("LLL")}
                    </p>
                  </div>

                  <div className="mt-4">
                    {status === "member" ? (
                      <button
                        className="bg-green-600 text-white px-4 py-2 rounded cursor-default"
                        disabled
                      >
                        ✅ Already a Member
                      </button>
                    ) : status === "pending" ? (
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded cursor-default"
                        disabled
                      >
                        ⏳ Request Pending
                      </button>
                    ) : (
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        onClick={() => handleJoinCommunity(community)}
                      >
                        ➕ {community.isPublic ? "Join" : "Request to Join"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <span className="px-4 py-2">
              Page {page} of {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllCommunityList;
