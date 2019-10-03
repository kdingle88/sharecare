import axios from "axios";
import { setAlert } from "./alert";
import { GET_PETS, GET_MY_PETS, PET_ERROR, MY_PETS_ERROR } from "./types";

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
