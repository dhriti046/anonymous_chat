import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import CreateProfile from "./pages/create_profile";
import Discover from "./pages/Discover_user";
import Profile from "./pages/profile";
import Chat from "./pages/chat";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-profile" element={<CreateProfile />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/chat/:id" element={<Chat />} />
      <Route path="/edit-profile" element={<EditProfile />} />
    </Routes>
  );
}

export default App;
