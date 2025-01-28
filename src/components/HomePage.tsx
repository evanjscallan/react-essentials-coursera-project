import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-page splash-bg">
      <div className="splash-box">
        <h1 className="splash-h1">Welcome to Paradise Nursery</h1>
        <p className="splash-description-paragraph">
          Welcome to Paradise Nursery, your ultimate online destination for all
          things green and beautiful. Whether you're a seasoned gardener or just
          starting your plant journey, our carefully curated selection of
          vibrant flowers, lush foliage, and unique indoor plants is sure to
          inspire and delight. Transform your home or garden into a serene
          sanctuary with our diverse range of botanicals, and experience the joy
          of cultivating your very own paradise. Shop now and let nature
          flourish in every corner of your life.
        </p>

        <Link className="button-1" to="/plants">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
