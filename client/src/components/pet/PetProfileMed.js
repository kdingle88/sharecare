import React from "react";
import PropTypes from "prop-types";

const PetProfileMed = ({ med }) => {
  return (
    <div>
      <h3 className="text-dark">{med}</h3>
    </div>
  );
};

PetProfileMed.propTypes = {
  med: PropTypes.string.isRequired
};

export default PetProfileMed;
