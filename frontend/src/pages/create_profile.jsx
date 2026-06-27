import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/CreateProfile.css";
import { API } from "../config";

function CreateProfile() {
  const [form, setForm] = useState({
   // username: "",
    email: "",
    password: "",
    bio: "",
    interests: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleCreate() {
    const interestArray = form.interests
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API}/api/auth/register`, {
        //username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
        bio: form.bio.trim(),
        interests: interestArray,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({
        _id: res.data._id,
        username: res.data.username,
        email: res.data.email,
        bio: res.data.bio,
        interests: res.data.interests,
      }));
      alert(`Welcome!\n\nYour anonymous username is ${res.data.username}. Use it to chat with others without revealing your identity.`);
      navigate("/discover");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="create-profile-page">
      <div className="create-profile-card">
        <div className="create-profile-logo">✨</div>
        <h1 className="create-profile-title">Create your profile</h1>
        <p className="create-profile-sub">Start connecting with people who share your interests</p>

        {error && <div className="create-profile-error">{error}</div>}

        <div className="create-profile-grid2">
          
          <div className="create-profile-field">
            <label className="create-profile-label">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={set("email")}
              className="create-profile-input"
            />
          </div>
        </div>

        <div className="create-profile-field">
          <label className="create-profile-label">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={set("password")}
            className="create-profile-input"
          />
        </div>

        <div className="create-profile-field">
          <label className="create-profile-label">Bio</label>
          <textarea
            placeholder="Tell people a bit about yourself…"
            value={form.bio}
            onChange={set("bio")}
            className="create-profile-textarea"
          />
        </div>

        <div className="create-profile-field">
          <label className="create-profile-label">Interests</label>
          <input
            placeholder="music, hiking, design, chess…"
            value={form.interests}
            onChange={set("interests")}
            className="create-profile-input"
          />
          <p className="create-profile-hint">Separate interests with commas</p>
        </div>

        <button
          onClick={handleCreate}
          className="create-profile-btn"
          style={{opacity: loading ? 0.7 : 1 }}
          disabled={loading}
        >
          {loading ? "Creating profile…" : "Create profile →"}
        </button>

        <div className="create-profile-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default CreateProfile;
