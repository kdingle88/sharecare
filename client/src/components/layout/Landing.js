import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <section className="landing">
        <div className="dark-overlay">
          <div className="white-box">
            <div className="landing-inner">
              <h1 className="x-large">Share Care</h1>
              <p className="lead">
                Let's save shelter resources. Foster a pet with your friends.
              </p>
              <div className="buttons">
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
                <Link to="/login" className="btn">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
