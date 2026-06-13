import { useParams, useNavigate } from "react-router-dom";
import users from "../data/users.js";

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const myProfile = JSON.parse(
  localStorage.getItem("profile")
);

 const allUsers = myProfile
    ? [...users, myProfile]
    : users;

  const user = allUsers.find(
    (u) => u.id === Number(id)
  );

  const isMyProfile =
    myProfile && myProfile.id === user?.id;
  if (!user) {
    return <h1>User not found</h1>;
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
          onClick={() => navigate(`/chat/${user.username}`)}
        >
          Start Chat
        </button>
      )}
    </div>
  );
}

export default Profile;