import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PETS,
  GET_A_PET,
  GET_MY_PETS,
  PET_ERROR,
  MY_PETS_ERROR
} from "./types";

// Get Pet
export const getPet = id => async dispatch => {
  try {
    const res = await axios.get("api/pet/id");

    dispatch({
      type: GET_A_PET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Pets
export const getPets = () => async dispatch => {
  try {
    const res = await axios.get("api/pet/all");

    dispatch({
      type: GET_PETS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Get User's Pets
export const getMyPets = () => async dispatch => {
  try {
    const res = await axios.get("api/pet/mypets");

    dispatch({
      type: GET_MY_PETS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MY_PETS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create Pet
export const createPet = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/pet", formData, config);

    dispatch({
      type: GET_A_PET,
      payload: res.data
    });

    dispatch(setAlert("Pet Created", "success"));

    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: PET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Update Pet

export const updatePet = (formData, history, id) => async dispatch => {
  try {
    const res = await axios.put("api/pet/id");

    dispatch({
      type: GET_A_PET,
      payload: res.data
    });

    dispatch(setAlert("Profile Updated", "success"));
  } catch (err) {
    dispatch({
      type: PET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
