import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Anonymous Chat</h1>

      <Link to="/create-profile">
        Create Profile
      </Link>

      <br />
      <br />

    </div>
  );
}

export default Home;