import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PendingRequest = ({ pendingPets }) => {
  const pendingRequests = pendingPets.map(pet => (
    <tr key={pet._id}>
      <td>{pet.shelter.name}</td>
      <td>{pet.name}</td>
      <td>
        <button className="btn btn-light">Cancel Request</button>
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
  pendingPets: PropTypes.array.isRequired
};

export default PendingRequest;
