import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/EditProfile.css";
import { API } from "../config";

function EditProfile() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const [form, setForm] = useState({
    username: currentUser?.username || "",
    bio: currentUser?.bio || "",
    interests: currentUser?.interests?.join(", ") || "",
  });
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, [navigate]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSave() {
    const interests = form.interests.split(",").map((i) => i.trim()).filter(Boolean);
    setLoading(true);
    setMsg({ type: "", text: "" });

    try {
      const res = await axios.put(
        `${API}/api/auth/update-profile`,
        { username: form.username.trim(), bio: form.bio.trim(), interests },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      const updated = {
        ...currentUser,
        username: res.data.username,
        bio: res.data.bio,
        interests: res.data.interests,
      };
      localStorage.setItem("user", JSON.stringify(updated));
      setMsg({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      setMsg({ type: "error", text: err?.response?.data?.message || "Update failed." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="edit-profile-page">
      <nav className="edit-profile-nav">
        <div className="edit-profile-nav-brand" onClick={() => navigate("/discover")}>
          <div className="edit-profile-brand-icon">💬</div>
          AnonChat
        </div>
        <button className="edit-profile-btn-back" onClick={() => navigate(-1)}>← Back</button>
      </nav>

      <main className="edit-profile-main">
        <div className="edit-profile-card">
          <h1 className="edit-profile-title">Edit profile</h1>
          <p className="edit-profile-sub">Update your public information</p>

          {msg.text && (
            <div className={msg.type === "success" ? "edit-profile-success" : "edit-profile-error"}>
              {msg.text}
            </div>
          )}

          <div className="edit-profile-field">
            <label className="edit-profile-label">Username</label>
            <input value={form.username} onChange={set("username")} className="edit-profile-input" />
          </div>

          <div className="edit-profile-field">
            <label className="edit-profile-label">Bio</label>
            <textarea
              value={form.bio}
              onChange={set("bio")}
              className="edit-profile-textarea"
              placeholder="Tell people about yourself…"
            />
          </div>

          <div className="edit-profile-field">
            <label className="edit-profile-label">Interests</label>
            <input
              value={form.interests}
              onChange={set("interests")}
              className="edit-profile-input"
              placeholder="music, hiking, chess…"
            />
            <p className="edit-profile-hint">Separate with commas</p>
          </div>

          <button
            className="edit-profile-btn-save"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving…" : "Save changes"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default EditProfile;
