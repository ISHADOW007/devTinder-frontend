import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { BASE_URL } from "../../utils/constants";
import { removeUser } from "../../utils/userSlice";
import { removeFeed } from "../../utils/feedSlice";
import { removeConnections } from "../../utils/connectionSlice";
import { disconnectSocket } from "../../utils/socketSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch(); // ✅ Correct hook usage
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const socket = useSelector((state) => state.socket.instance);

  // ✅ Handle Logout
const handleLogout = async () => {
  try {
    await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });

    if (socket) {
      socket.emit("manualDisconnect", { userId: user._id }); // ✅ Notify backend
      console.log("satyam")
      socket.disconnect(); // ✅ Close the connection
      console.log("Socket disconnected");
    }

    dispatch(disconnectSocket());
    dispatch(removeUser());
    dispatch(removeFeed());
    dispatch(removeConnections());

    navigate("/login");
  } catch (error) {
    console.error("Logout failed:", error.message);
  }
};


  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navbar bg-green-600 text-white shadow-md px-4">
      {/* 🔰 Brand */}
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost text-2xl font-bold tracking-wide hover:bg-green-700"
        >
          DevTinder
        </Link>
      </div>

      {/* 🧑‍💼 User Section */}
      <div className="flex items-center gap-4">
        {user && (
          <div className="relative" ref={dropdownRef}>
            {/* Avatar + Welcome */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <p className="hidden md:block font-medium text-sm">
                Welcome, <span className="font-semibold">{user.firstName}</span>
              </p>
              <div className="btn btn-ghost btn-circle avatar hover:bg-green-700">
                <div className="w-10 rounded-full ring ring-white ring-offset-2 ring-offset-green-600">
                  <img
                    alt="User Avatar"
                    src={
                      user.photoUrl ||
                      "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    }
                  />
                </div>
              </div>
            </div>

            {/* 🔽 Dropdown Menu */}
            {dropdownOpen && (
              <ul className="absolute top-14 right-0 z-50 bg-white text-black menu menu-sm rounded-box shadow w-52 p-2">
                <li>
                  <Link to="/profile" className="hover:bg-gray-100 rounded">
                    Profile
                    <span className="badge badge-primary">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/requests" className="hover:bg-gray-100 rounded">
                    Requests
                    <span className="badge badge-primary">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections" className="hover:bg-gray-100 rounded">
                    Connections
                  </Link>
                </li>
                <li onClick={handleLogout}>
                  <a className="hover:bg-gray-100 rounded">Logout</a>
                </li>
                <li>
                  <Link
                    to="/createCommunity"
                    className="hover:bg-gray-100 rounded"
                  >
                    createCommunity
                    <span className="badge badge-primary">New</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/allCommunityList"
                    className="hover:bg-gray-100 rounded"
                  >
                    allCommunityList
                    <span className="badge badge-primary">New</span>
                  </Link>
                  <Link
                    to="/communitiesWhereIMemberOrAdmin"
                    className="hover:bg-gray-100 rounded"
                  >
                    CommunitiesWhereImemberOrAdmin
                    <span className="badge badge-primary">New</span>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
