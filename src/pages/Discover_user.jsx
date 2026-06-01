import { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../data/users.js";

function DiscoverUsers() {
  const profile = JSON.parse(
    localStorage.getItem("profile")
  );
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) =>
    searchQuery === ""
      ? true
      : user.interests.some((interest) =>
          interest
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
  );

  return (
    <div>
      <h1>Discover Users</h1>

      {profile && (
        <div>
          <h2>Welcome {profile.username}</h2>

          <p>
            Interests: {profile.interests.join(", ")}
          </p>
        </div>
      )}

      <hr />

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
              onClick={() => navigate(`/profile/${user.id}`)}
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