import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import { getCurrentProfile } from "../../actions/profile";
import { getMyPets, getMyPendingPets } from "../../actions/pet";
import PendingRequest from "../dashboard/PendingRequest";
import ClusterRequest from "../dashboard/ClusterRequest";

const Dashboard = ({
  getCurrentProfile,
  getMyPets,
  getMyPendingPets,
  auth: { user },
  profile,
  pet
}) => {
  useEffect(() => {
    getCurrentProfile();
    getMyPets();
    getMyPendingPets();
  }, []);

  return profile.loading && pet.loading && profile.profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user">Welcome {user && user.name}</i>
      </p>
      {profile.profile !== null ? (
        <Fragment>
          <DashboardActions />
          <PendingRequest pendingPets={pet.pendingPets} />
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}

      {pet.pets.length !== 0 ? (
        <Fragment>
          <ClusterRequest pets={pet.pets} />
        </Fragment>
      ) : user && user.shelter ? (
        <Fragment>
          <p>You are not managing any pets. Feel free to add one</p>
          <Link to="/create-pet" className="btn btn-primary my-1">
            Add Pet
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            You currently don't have any pets in your cluster. Feel free to
            browse and find one that fits you!
          </p>
          <Link to="/view-pet" className="btn btn-primary my-1">
            Browse Pets
          </Link>
          <PendingRequest pendingPets={pet.pendingPets} />
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getMyPets: PropTypes.func.isRequired,
  getMyPendingPets: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  pet: state.pet
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getMyPets, getMyPendingPets }
)(Dashboard);
