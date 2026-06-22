import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import CreateProfile from "./pages/create_profile";
import DiscoverUsers from "./pages/Discover_user";
import Profile from "./pages/profile";
import Chat from "./pages/chat";

//routing map
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/create-profile"
        element={<CreateProfile />}
      />

      <Route
        path="/discover"
        element={<DiscoverUsers />}
      />

      <Route path="/profile/:id" element={<Profile />} />

      <Route path="/chat/:id" element={<Chat />} />
    </Routes>
  );
}

export default App;