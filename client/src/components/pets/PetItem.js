import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PetItem = ({
  pet: { _id, avatar, name, location, breed, personality }
}) => {
  return (
    <div className="pet bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>{breed}</p>
        <p>{location}</p>
        <p>{personality}</p>
        <Link to={`/pet/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
    </div>
  );
};

PetItem.propTypes = {
  pet: PropTypes.object.isRequired
};

export default PetItem;
