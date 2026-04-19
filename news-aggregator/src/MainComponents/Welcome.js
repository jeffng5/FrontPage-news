import React from "react";
import "../css/App.css";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <main className="welcome-page">
      <h1 className="welcome">Welcome to</h1>
      <p className="news-title">
        <b className="title">YourFrontPageNews.com</b>
      </p>

      <h2 className="welcome-page__tagline">
        <span className="welcome-page__line">
          your curated articles of your news preferences
        </span>
        <span className="welcome-page__line">
          from the{" "}
          <strong className="welcome-page__emphasis">
            top news publications
          </strong>
        </span>
      </h2>

      <nav className="welcome-page__actions" aria-label="Account">
        <Link to="/login" className="welcome-page__link">
          <p className="top">Login</p>
        </Link>
        <Link to="/signup" className="welcome-page__link">
          <p className="top-1">Register</p>
        </Link>
      </nav>
    </main>
  );
};

export default Welcome;
