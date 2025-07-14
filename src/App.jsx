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
import UserCommunityRequests from "./components/UserCommunityRequests";
import CommunityMembers from "./components/CommunityMembers";
import CommunitiesWhereImemberOrAdmin from "./components/CommunitiesWhereImemberOrAdmin";
import CommunitiesWhereImemberOrAdminmembersList from "./components/CommunitiesWhereImemberOrAdminmembersList";
import CommuntyChatMessage from "./components/CommuntyChatMessage";
import Form from "../pages/form";
import SpeedMatch from "../pages/SpeedMatch";

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
            <Route path="formFillUp" element={<Form />} />


            {/* 🤝 Social routes */}
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
            <Route path="chat/:targetUserId" element={<Chat />} />

            {/* 🌐 Community routes */}
            <Route path="createCommunity" element={<CreateCommunity />} />
            <Route path="/userCommunity" element={<UserCommunityList />} />
            <Route path="/userCommunity/:id" element={<UserCommunityRequests />} />
            <Route path="/allCommunityList" element={<AllCommunityList />} />
            <Route path="/community/:id/members" element={<CommunityMembers />} />
            <Route path="/communitiesWhereIMemberOrAdmin" element={<CommunitiesWhereImemberOrAdmin />} />
            <Route path="/:id/whereIamAdminOrMembermembersList" element={<CommunitiesWhereImemberOrAdminmembersList />} />
            <Route path="/communityChat/:id" element={<CommuntyChatMessage/>}/>
            
             



             <Route path="/speedmatch" element={<SpeedMatch />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
