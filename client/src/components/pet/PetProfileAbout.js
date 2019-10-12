import React from "react";
import PropTypes from "prop-types";

const PetProfileAbout = ({ pet: { name, bio, personality } }) => (
  <div className="pet-about bg-light p-2">
    <h2 className="text-primary">{name}'s Bio</h2>
    <p>{bio}</p>
    <div className="line"></div>
    <h2 className="text-primary">Personality</h2>
    <p>{personality}</p>
  </div>
);

PetProfileAbout.propTypes = {
  pet: PropTypes.object.isRequired
};

export default PetProfileAbout;
