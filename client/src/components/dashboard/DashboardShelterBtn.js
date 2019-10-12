import React from "react";
import { Link } from "react-router-dom";

const DashboardShelterBtn = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
      <Link to="/profile" className="btn">
        <i className="fas fa-smile-wink text-primary"></i> View Profile
      </Link>
      <Link to="/create-pet" className="btn">
        <i className="fas fa-dog text-primary"></i> Add a Pet
      </Link>
    </div>
  );
};

export default DashboardShelterBtn;
