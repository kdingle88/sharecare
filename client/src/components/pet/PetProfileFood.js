import React from "react";
import PropTypes from "prop-types";

const PetProfileFood = ({ meal }) => {
  return (
    <div>
      <h3 className="text-dark">{meal}</h3>
    </div>
  );
};

PetProfileFood.propTypes = {
  meal: PropTypes.string.isRequired
};

export default PetProfileFood;
