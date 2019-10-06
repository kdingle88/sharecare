import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPet } from "../../actions/pet";

const CreatePet = ({ createPet, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    avatar: "",
    species: "",
    breed: "",
    gallery: "",
    personality: "",
    bio: "",
    slackspace: "",
    food: "",
    medications: "",
    location: "",
    notes: ""
  });

  const {
    name,
    age,
    avatar,
    species,
    breed,
    gallery,
    personality,
    bio,
    slackspace,
    food,
    medications,
    location,
    notes
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createPet(formData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Create Pet Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i>
        Let's get some information about the pet you would like to foster
      </p>
      <small>* = required fields</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="*Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            required
          />
          <small className="form-text">Enter pet's name</small>
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="*Age"
            name="age"
            value={age}
            onChange={e => onChange(e)}
            required
          />
          <small className="form-text">Enter pet's age in months</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="*Avatar"
            name="avatar"
            value={avatar}
            onChange={e => onChange(e)}
            required
          />
          <small className="form-text">
            Paste in Image Url you would like as main photo
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="*Species"
            name="species"
            value={species}
            onChange={e => onChange(e)}
            required
          />
          <small className="form-text">Enter Species(Dog, Cat,etc)</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="*Breed"
            name="breed"
            value={breed}
            onChange={e => onChange(e)}
            required
          />
          <small className="form-text">Enter Breed</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Image Urls"
            name="gallery"
            value={gallery}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Paste in Image Urls for gallery. If more than one, seperate each
            item with a comma
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="*Personality"
            name="personality"
            value={personality}
            onChange={e => onChange(e)}
            required
          />
          <small className="form-text">
            Enter key personality traits. Energetic? Shy? For advanced fosters?
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="*Bio"
            name="bio"
            value={bio}
            onChange={e => onChange(e)}
            required
          ></textarea>
          <small className="form-text">Orgin story.</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="*Slack"
            name="slackspace"
            value={slackspace}
            onChange={e => onChange(e)}
            required
          />
          <small className="form-text">
            What's the slack channel for this Pet? (e.g. #Jake-the-dog)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Food"
            name="food"
            value={food}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            If more than one, seperate each by item with a comma
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Medications"
            name="medications"
            value={medications}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            If more than one, seperate each by item with a comma
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="*Location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
            required
          />
          <small className="form-text">Where is the pet located?</small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="Notes"
            name="notes"
            value={notes}
            onChange={e => onChange(e)}
          ></textarea>
          <small className="form-text">Anything else we should know?</small>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a href="dashboard.html" className="btn btn-light my-1">
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

CreatePet.propTypes = {
  createPet: PropTypes.func.isRequired
};

export default connect(
  null,
  { createPet }
)(CreatePet);
