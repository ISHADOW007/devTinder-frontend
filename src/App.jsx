import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider, useDispatch, useSelector } from "react-redux";

import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat from "./components/Chat";
import CreateCommunity from "./components/CreateCommunity";
import UserCommunityList from "./components/UserCommunityList";
import AllCommunityList from "./components/AllCommunityList";
import UserCommunityRequests from "./components/UserCommunityRequests";
import CommunityMembers from "./components/CommunityMembers";
import CommunitiesWhereImemberOrAdmin from "./components/CommunitiesWhereImemberOrAdmin";
import CommunitiesWhereImemberOrAdminmembersList from "./components/CommunitiesWhereImemberOrAdminmembersList";
import CommuntyChatMessage from "./components/CommuntyChatMessage";
import Form from "../pages/form";
import SpeedMatch from "../pages/SpeedMatch";
import useUserStatusListener from "../utils/useUserStatusListener";
import { connectSocket } from "../utils/socketSlice";
import { useEffect, useState } from "react";
import useTabVisibilityStatus from "../utils/useTabVisibilityStatus";



export default function App() {
    const user = useSelector((state) => state.user);
  const socket = useSelector((state) => state.socket.instance);
  const dispatch = useDispatch();

  useUserStatusListener(); // listens for changes to other users
  useTabVisibilityStatus(user?._id); // 👈 detect tab switch and emit manually

  useEffect(() => {
    if (user?._id && !socket) {
      dispatch(connectSocket(user._id)); // Initializes the socket
    }
  }, [user, socket, dispatch]);
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Feed />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="formFillUp" element={<Form />} />
          <Route path="connections" element={<Connections />} />
          <Route path="requests" element={<Requests />} />
          <Route path="chat/:targetUserId" element={<Chat />} />
          <Route path="createCommunity" element={<CreateCommunity />} />
          <Route path="/userCommunity" element={<UserCommunityList />} />
          <Route path="/userCommunity/:id" element={<UserCommunityRequests />} />
          <Route path="/allCommunityList" element={<AllCommunityList />} />
          <Route path="/community/:id/members" element={<CommunityMembers />} />
          <Route
            path="/communitiesWhereIMemberOrAdmin"
            element={<CommunitiesWhereImemberOrAdmin />}
          />
          <Route
            path="/:id/whereIamAdminOrMembermembersList"
            element={<CommunitiesWhereImemberOrAdminmembersList />}
          />
          <Route path="/communityChat/:id" element={<CommuntyChatMessage />} />
          <Route path="/speedmatch" element={<SpeedMatch />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
