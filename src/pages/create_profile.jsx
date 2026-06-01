import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateProfile() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");

  const navigate = useNavigate();

  function createProfile() {
    const interestArray = interests
      .split(",")
      .map((interest) => interest.trim())
      .filter((interest) => interest !== "");

    if (!username.trim() || !bio.trim() || interestArray.length === 0) {
      alert("Please fill all fields");
      return;
    }

    const profile = {
      id: Date.now(),
      username: username.trim(),
      bio: bio.trim(),
      interests: interestArray,
    };

    localStorage.setItem("profile", JSON.stringify(profile));

    navigate(`/profile/${profile.id}`);
  }

  return (
    <div>
      <h1>Create Profile</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Interests (comma separated)"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
      />

      <br />
      <br />

      <button onClick={createProfile}>
        Create Profile
      </button>
    </div>
  );
}

export default CreateProfile;