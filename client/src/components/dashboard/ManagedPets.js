import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePet } from "../../actions/pet";

const ManagedPets = ({ pets, deletePet }) => {
  const managedPets = pets.map(pet => (
    <Fragment key={pet._id}>
      <img src={pet.avatar} alt="avatar" />

      <Link to={`/edit-pet/${pet._id}`} className="btn">
        Edit {pet.name}
      </Link>
      <button onClick={() => deletePet(pet._id)} className="btn btn-danger">
        Delete {pet.name}
      </button>
    </Fragment>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Your Managed Pets</h2>
      <div className="mypets">{managedPets}</div>
    </Fragment>
  );
};

ManagedPets.propTypes = {
  pets: PropTypes.array.isRequired,
  deletePet: PropTypes.func.isRequired
};

export default connect(
  null,
  { deletePet }
)(ManagedPets);
