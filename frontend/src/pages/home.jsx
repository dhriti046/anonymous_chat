import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-container">
      {/* Background glow effects */}
      <div className="home-glow-1" />
      <div className="home-glow-2" />

      <div className="home-card">
        <div className="home-logo">💬</div>
        
        <h1 className="home-title">
          Anonymously connect with people who share your interests.
        </h1>

        <p className="home-subtitle">
          Discover users, explore profiles, and start conversations without revealing your real identity.
        </p>

        <div className="home-actions">
          <Link to="/create-profile" className="home-btn primary">
            Get Started
          </Link>

          <Link to="/login" className="home-btn secondary">
            Sign In
          </Link>
        </div>

        <ul className="home-features">
          <li className="home-feature-item">
            <span className="home-feature-icon">🔍</span>
            <span className="home-feature-text">Discover by interest</span>
          </li>
          <li className="home-feature-item">
            <span className="home-feature-icon">⚡</span>
            <span className="home-feature-text">Real-time chat</span>
          </li>
          <li className="home-feature-item">
            <span className="home-feature-icon">🎭</span>
            <span className="home-feature-text">Anonymous usernames</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;