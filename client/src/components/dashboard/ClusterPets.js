import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ClusterPets = ({ pets }) => {
  const clusterPets = pets.map(pet => (
    <Fragment>
      <img src={pet.avatar} alt="avatar" />
      <Link to={`/pet/${pet._id}`}>View {pet.name}</Link>
    </Fragment>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Your Pet Clusters</h2>
      <div className="mypets">{clusterPets}</div>
    </Fragment>
  );
};

ClusterPets.propTypes = {
  pets: PropTypes.array.isRequired
};

export default ClusterPets;
