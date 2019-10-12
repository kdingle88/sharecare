import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PetProfileTop from "./PetProfileTop";
import PetProfileAbout from "./PetProfileAbout";
import PetProfileFood from "./PetProfileFood";
import PetProfileMed from "./PetProfileMed";
import PetProfileGallery from "./PetProfileGallery";
import { getPet, getMyPets, addClusterRequest } from "../../actions/pet";

const PetProfile = ({
  getPet,
  getMyPets,
  addClusterRequest,
  match,
  pet: { pet, pets, pendingPets, loading },
  auth
}) => {
  useEffect(() => {
    getMyPets();
    getPet(match.params.id);
  }, [getPet, match.params.id]);

  return (
    <Fragment>
      {pet === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/pets" className="btn btn-light">
            Back to Pet List
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === pet.shelter._id && (
              <Link to={`/edit-pet/${pet._id}`} className="btn btn-dark">
                Edit {pet.name}'s Profile
              </Link>
            )}
          <div className="pet-grid my-1">
            <PetProfileTop
              pet={pet}
              pets={pets}
              pendingPets={pendingPets}
              user={auth.user}
              addClusterRequest={addClusterRequest}
            />
            <PetProfileAbout pet={pet} />
            <div className="pet-food bg-white p-2">
              <h2 className="text-primary">Food</h2>
              {pet.food.length > 0 ? (
                <Fragment>
                  {pet.food.map((meal, index) => (
                    <PetProfileFood key={index} meal={meal} />
                  ))}
                </Fragment>
              ) : (
                <h4>No foods listed</h4>
              )}
            </div>

            <div className="pet-med bg-white p-2">
              <h2 className="text-primary">Medications</h2>
              {pet.medications.length > 0 ? (
                <Fragment>
                  {pet.medications.map((med, index) => (
                    <PetProfileMed key={index} med={med} />
                  ))}
                </Fragment>
              ) : (
                <h4>No medications listed</h4>
              )}
            </div>

            <div className="pet-gallery">
              <h2 className="text-primary my-1">Photo Gallery</h2>
              <div className="gallery">
                {pet.gallery.length > 0 ? (
                  <Fragment>
                    {pet.gallery.map((image, index) => (
                      <PetProfileGallery key={index} image={image} />
                    ))}
                  </Fragment>
                ) : (
                  <h4>No gallery images for {pet.name}</h4>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

PetProfile.propTypes = {
  getPet: PropTypes.func.isRequired,
  getmyPets: PropTypes.func.isRequired,
  getPet: PropTypes.func.isRequired,
  addClusterRequest: PropTypes.func.isRequired,
  pet: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  pet: state.pet,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPet, getMyPets, addClusterRequest }
)(PetProfile);
