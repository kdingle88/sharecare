import React, { Fragment } from "react";
import PropTypes from "prop-types";

const PendingRequest = ({ pendingPets, removeClusterRequest }) => {
  const pendingRequests = pendingPets.map(pet => (
    <tr key={pet._id}>
      <td>{pet.shelter.name}</td>
      <td>{pet.name}</td>
      <td>
        <button
          className="btn btn-light"
          onClick={() => {
            removeClusterRequest(pet._id);
            window.location.reload();
          }}
        >
          Cancel Request
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">My Pending Requests</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Shelter</th>
            <th>Pet</th>
          </tr>
        </thead>
        <tbody>{pendingRequests}</tbody>
      </table>
    </Fragment>
  );
};

PendingRequest.propTypes = {
  pendingPets: PropTypes.array.isRequired,
  removeClusterRequest: PropTypes.func.isRequired
};

export default PendingRequest;
