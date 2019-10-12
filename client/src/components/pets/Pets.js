import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PetItem from "./PetItem";
import { getPets } from "../../actions/pet";

const Pets = ({ getPets, pet: { pets, loading } }) => {
  useEffect(() => {
    getPets();
  }, [getPets]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Pets</h1>
          <p className="lead">
            Browse pets looking for care <i className="fas fa-dog"></i>
          </p>
          <div className="pets">
            {pets.length > 0 ? (
              pets.map(pet => <PetItem key={pet._id} pet={pet} />)
            ) : (
              <h4>No Pets found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Pets.propTypes = {
  getPets: PropTypes.func.isRequired,
  pet: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  pet: state.pet
});

export default connect(
  mapStateToProps,
  { getPets }
)(Pets);
