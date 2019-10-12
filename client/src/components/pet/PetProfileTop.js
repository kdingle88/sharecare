import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const PetProfileTop = ({
  pets,
  pendingPets,
  pet: { _id, name, avatar, breed, age, shelter },
  user,
  addClusterRequest,
  history
}) => {
  const yourPet = pets.some(item => item._id === _id);
  const petsPending = pendingPets.some(item => item._id === _id);

  return (
    <div className="pet-top bg-primary p-2">
      <img className="round-img my-1 " src={avatar} alt="avatar" />

      <h1 className="large">{name}</h1>
      <p className="lead">{breed}</p>
      <p>{age} Months old</p>
      <a href="#">{shelter.name}</a>
      {yourPet === false &&
        petsPending === false &&
        user &&
        user.shelter === false && (
          <Fragment>
            <button
              className="btn my-1"
              onClick={() => {
                addClusterRequest(_id);
                history.push("/dashboard");
              }}
            >
              Request to Join Cluster
            </button>
          </Fragment>
        )}
    </div>
  );
};

PetProfileTop.propTypes = {
  pet: PropTypes.object.isRequired,
  pets: PropTypes.array.isRequired,
  pendingPets: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  addClusterRequest: PropTypes.func.isRequired
};

export default withRouter(PetProfileTop);
