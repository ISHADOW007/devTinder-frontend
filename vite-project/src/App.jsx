import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat from "./components/Chat";
import CreateCommunity from "./components/CreateCommunity";
import UserCommunityList from "./components/UserCommunityList";
import AllCommunityList from "./components/AllCommunityList";

export default function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          {/* 🏠 Main layout route */}
          <Route path="/" element={<Body />}>
            {/* 📰 Default feed page */}
            <Route index element={<Feed />} />

            {/* 🔐 Auth & Profile routes */}
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />

            {/* 🤝 Social routes */}
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
            <Route path="chat/:targetUserId" element={<Chat />} />

            {/* 🌐 Community routes */}
            <Route path="createCommunity" element={<CreateCommunity />} />
            <Route path="/userCommunity" element={<UserCommunityList />} />
            <Route path="/allCommunityList" element={<AllCommunityList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
