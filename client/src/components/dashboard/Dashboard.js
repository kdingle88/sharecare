import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardShelterBtn from "./DashboardShelterBtn";
import DashboardUserBtn from "./DashboardUserBtn";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import {
  getMyPets,
  getMyPendingPets,
  acceptClusterRequest,
  denyClusterRequest,
  removeClusterRequest
} from "../../actions/pet";
import PendingRequest from "../dashboard/PendingRequest";
import ClusterRequest from "../dashboard/ClusterRequest";
import ManagedPets from "../dashboard/ManagedPets";
import ClusterPets from "../dashboard/ClusterPets";

const Dashboard = ({
  getCurrentProfile,
  getMyPets,
  getMyPendingPets,
  acceptClusterRequest,
  denyClusterRequest,
  removeClusterRequest,
  deleteAccount,
  auth: { user },
  profile,
  pet
}) => {
  useEffect(() => {
    getCurrentProfile();
    getMyPets();
    getMyPendingPets();
  }, [getCurrentProfile, getMyPets, getMyPendingPets]);

  return profile.loading && pet.loading && profile.profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user">Welcome {user && user.name}</i>
      </p>
      {profile.profile !== null ? (
        <Fragment></Fragment>
      ) : (
        <Fragment>
          <p>You have not setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}

      {pet.pets.length !== 0 ? (
        <Fragment></Fragment>
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
          <Link to="/pets" className="btn btn-primary my-1">
            Browse Pets
          </Link>
        </Fragment>
      )}
      {user && !user.shelter ? (
        <Fragment>
          <DashboardUserBtn />
          <ClusterPets pets={pet.pets} />
          <PendingRequest
            pendingPets={pet.pendingPets}
            removeClusterRequest={removeClusterRequest}
          />
        </Fragment>
      ) : (
        <Fragment>
          <DashboardShelterBtn />
          <ManagedPets pets={pet.pets} />
          <ClusterRequest
            pets={pet.pets}
            acceptClusterRequest={acceptClusterRequest}
            denyClusterRequest={denyClusterRequest}
          />
        </Fragment>
      )}
      <div className="my-2">
        <button className="btn btn-danger" onClick={() => deleteAccount()}>
          <i className="fas fa-user-minus"></i> Delete My Account
        </button>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getMyPets: PropTypes.func.isRequired,
  getMyPendingPets: PropTypes.func.isRequired,
  acceptClusterRequest: PropTypes.func.isRequired,
  denyClusterRequest: PropTypes.func.isRequired,
  removeClusterRequest: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
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
  {
    getCurrentProfile,
    getMyPets,
    getMyPendingPets,
    acceptClusterRequest,
    denyClusterRequest,
    removeClusterRequest,
    deleteAccount
  }
)(Dashboard);
