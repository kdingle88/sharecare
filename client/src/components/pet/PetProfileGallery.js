import React, { Fragment } from "react";
import PropTypes from "prop-types";

const PetProfileGallery = ({ image }) => {
  return (
    <Fragment>
      <img src={image} alt="image" className="m-1" />
    </Fragment>
  );
};

PetProfileGallery.propTypes = {
  image: PropTypes.string.isRequired
};

export default PetProfileGallery;
