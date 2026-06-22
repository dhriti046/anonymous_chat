import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const currentUser = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  useEffect(() => {
    fetch(`http://localhost:3001/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, [id]);

  const isMyProfile =
    currentUser && currentUser._id === user?._id;

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>{user.username}</h1>

      <h3>Bio</h3>
      <p>{user.bio}</p>

      <h3>Interests</h3>
      <ul>
        {user.interests.map((interest, index) => (
          <li key={index}>{interest}</li>
        ))}
      </ul>

      {isMyProfile ? (
        <>
          <button>
            Edit Profile
          </button>

          <button onClick={() => navigate("/discover")}>
            Discover Users
          </button>
        </>
      ) : (
        <button
          onClick={() => navigate(`/chat/${user._id}`)}
        >
          Start Chat
        </button>
      )}
    </div>
  );
}

export default Profile;