import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DiscoverUsers() {
  
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const currentUser = JSON.parse(
  localStorage.getItem("user") || "null"
  );
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
  }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  const filteredUsers = users
  .filter(user => !currentUser || user.email !== currentUser.email)
  .filter(user =>
    searchQuery === "" ||
    user.interests.some(interest =>
      interest.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div>

      <h1>Discover Users</h1>

      {currentUser && (
        <h3>Welcome {currentUser.username}</h3>
      )}

      <button onClick={logout}>
      Logout
      </button>
      <input
        type="text"
        placeholder="Search by interest"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button
        onClick={() => setSearchQuery(searchTerm)}
      >
        Search
      </button>

      <br />
      <br />

      <h2>Active Users</h2>

      {filteredUsers.length === 0 ? (
        <p>No users found with that interest.</p>
      ) : (
        filteredUsers.map((user, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{user.username}</h3>

            <p>
              Interests: {user.interests.join(", ")}
            </p>

            <button onClick={() => navigate(`/chat/${user.username}`)}>
              Chat
            </button>
            <button
              onClick={() => navigate(`/profile/${user._id}`)}
            >
              View Profile
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default DiscoverUsers;