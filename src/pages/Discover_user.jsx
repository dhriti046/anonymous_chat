import { useState } from "react";

function DiscoverUsers() {
  const profile = JSON.parse(
    localStorage.getItem("profile")
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const activeUsers = [
    {
      username: "AI_Master",
      interests: ["AI", "ML", "Python"],
    },
    {
      username: "DSA_King",
      interests: ["DSA", "CP", "C++"],
    },
    {
      username: "WebDev",
      interests: ["React", "AI", "CSS"],
    },
    {
      username: "GameGuy",
      interests: ["Gaming", "Anime"],
    },
  ];

  const filteredUsers = activeUsers.filter((user) =>
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

            <button>Chat</button>
          </div>
        ))
      )}
    </div>
  );
}

export default DiscoverUsers;