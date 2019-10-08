import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ClusterRequest = ({ pets }) => {
  const clusterPets = pets.map(pet =>
    pet.clusterRequest.map(user => (
      <tr key={pet._id}>
        <td>{user.name}</td>
        <td>{pet.name}</td>
        <td>
          <button className="btn btn-success">Accept</button>
          <button className="btn btn-danger">Decline</button>
        </td>
      </tr>
    ))
  );

  return (
    <Fragment>
      <h2 className="my-2">Cluster Requests</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Caregiver</th>
            <th>Pet</th>
          </tr>
        </thead>
        <tbody>{clusterPets}</tbody>
      </table>
    </Fragment>
  );
};

ClusterRequest.propTypes = {
  pets: PropTypes.array.isRequired
};

export default ClusterRequest;
