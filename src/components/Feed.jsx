import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  // 🧠 Fetch the feed data if not already in Redux
  const getFeed = async () => {
    if (feed) return; // Skip if already loaded

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      // ✅ Only store the actual array of users
      dispatch(addFeed(res.data.data));
    } catch (error) {
      console.error("Failed to fetch feed:", error.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className=" min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 px-4">
      {feed?.length ? (
        <UserCard user={feed[0]} />
      ) : (
        <div className="text-center text-gray-600 text-lg font-medium">
          No more users available 😔
        </div>
      )}
    </div>
  );
};

export default Feed;
