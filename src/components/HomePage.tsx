import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-page splash-bg">
      <div>
        <h1 className="splash-h1">Welcome to Paradise Nursery</h1>
      </div>
      <Link className="button-1" to="/plants">
        Get Started
      </Link>
    </div>
  );
};

export default HomePage;
