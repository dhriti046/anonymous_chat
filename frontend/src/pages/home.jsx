import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-page">
      <div className="home-glow" />

      <div className="home-badge">
        <span className="home-badge-indicator" />
        Anonymous & secure
      </div>

      <h1 className="home-heading">
        Connect with people<br />
        <span className="home-accent">who share your interests</span>
      </h1>

      <p className="home-sub">
        Discover users by interests, explore their profiles, and start real conversations — no algorithms, no noise.
      </p>

      <div className="home-actions">
        <Link
          to="/create-profile"
          className="home-btn home-btn-primary"
          onMouseOver={e => e.currentTarget.style.opacity = "0.9"}
          onMouseOut={e => e.currentTarget.style.opacity = "1"}
        >
          Get started →
        </Link>
        <Link
          to="/login"
          className="home-btn home-btn-secondary"
          onMouseOver={e => { e.currentTarget.style.background = "var(--bg-hover)"; e.currentTarget.style.borderColor = "var(--border-hover)"; }}
          onMouseOut={e => { e.currentTarget.style.background = "var(--bg-card)"; e.currentTarget.style.borderColor = "var(--border)"; }}
        >
          Sign in
        </Link>
      </div>

      <div className="home-features">
        {[
          { icon: "🔍", text: "Discover by interest" },
          { icon: "💬", text: "Real-time chat" },
          { icon: "👤", text: "Rich profiles" },
        ].map((f) => (
          <div key={f.text} className="home-feature">
            <div className="home-feature-icon">{f.icon}</div>
            <div className="home-feature-text">{f.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
