import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateProfile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");

  const navigate = useNavigate();

  async function createProfile() {
    const interestArray = interests
      .split(",")
      .map((interest) => interest.trim())
      .filter((interest) => interest !== "");

    if (!username.trim() || !email.trim() || !password.trim() || !bio.trim() || interestArray.length === 0) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:3001/api/auth/register", {
        username: username.trim(),
        email: email.trim(),
        password,
        interests: interestArray,
      });

      alert("Account created successfully");
      navigate("/discover");
    } catch (error) {
      alert(error?.response?.data?.message || "Registration failed");
    }
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
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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