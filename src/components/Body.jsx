import { useEffect } from "react";
import Navbar from "./Navbar"; // 🧭 Top navigation bar
import { Outlet, useNavigate } from "react-router-dom"; // 🔁 Placeholder for nested route components
import Footer from "./Footer"; // 🧾 Bottom footer component
import { BASE_URL } from "../utils/constants"; // 🌐 Base URL for API requests
import { addUser } from "../utils/userSlice"; // 👤 Redux action to store user in state
import { useDispatch, useSelector } from "react-redux"; // 🚀 Hook to dispatch Redux actions
import axios from "axios"; // 🌐 Library for making HTTP requests

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  // 📥 Fetch logged-in user's profile (if session cookie exists)
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true, // ✅ Include cookies (e.g., session JWT)
      });

      // ✅ Store user in Redux state
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  // 🚀 Fetch user when the component mounts (only once)
  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, [userData]);

  return (
    <div className="min-h-screen flex flex-col justify-between ">
      {/* 🔝 Persistent navbar across all routes */}
      <Navbar />

      {/* 🔁 Nested route component will be rendered here */}
      <Outlet />

      {/* 🔚 Persistent footer across all routes */}
      <Footer />
    </div>
  );
};

export default Body;

// <Outlet /> will dynamically render child route components defined in App.jsx or routes config
