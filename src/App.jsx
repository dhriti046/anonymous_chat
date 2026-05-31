import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateProfile from "./pages/create_profile";
import DiscoverUsers from "./pages/Discover_user";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateProfile />} />
        <Route path="/discover" element={<DiscoverUsers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;