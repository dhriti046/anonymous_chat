import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home">
      <h1>Anonymously connect with people who share your interests.</h1>

      <p>
        Discover users, explore profiles, and start conversations without revealing your identity.
      </p>

      <div className="actions">
        <Link to="/create-profile" className="btn primary">
          Get Started
        </Link>

        <Link to="/login" className="btn secondary">
          Sign In
        </Link>
      </div>

      <ul className="features">
        <li>🔍 Discover by interest</li>
        <li>💬 Real-time chat</li>
        <li>👤 Randomly generated anonymous usernames</li>
      </ul>
    </div>
  );
}

export default Home;