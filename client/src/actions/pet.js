import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PETS,
  GET_A_PET,
  GET_MY_PETS,
  GET_MY_PENDING_PETS,
  PET_ERROR,
  MY_PETS_ERROR,
  UPDATE_CLUSTER_REQUEST,
  UPDATE_CLUSTER,
  CLEAR_PET
} from "./types";

// Get Pet
export const getPet = id => async dispatch => {
  try {
    const res = await axios.get(`/api/pet/${id}`);

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
  dispatch({ type: CLEAR_PET });

  try {
    const res = await axios.get("/api/pet/all");

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
// Get User's Pets (Cluster or managed)
export const getMyPets = () => async dispatch => {
  dispatch({ type: CLEAR_PET });

  try {
    const res = await axios.get("/api/pet/mypets");

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
    const res = await axios.put("/api/pet/id");

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

export const getMyPendingPets = userId => async dispatch => {
  try {
    const res = await axios.get("/api/pet/mypendingpets");

    dispatch({
      type: GET_MY_PENDING_PETS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MY_PETS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add user to Cluster Request
export const addClusterRequest = petId => async dispatch => {
  try {
    const res = await axios.put(`/api/pet/request/${petId}`);

    dispatch({
      type: UPDATE_CLUSTER_REQUEST,
      payload: { petId, clusterRequest: res.data }
    });

    dispatch(setAlert("Pet Added to your cluster requests", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// DELETE Cluster Request/ Cancel Request by user
export const removeClusterRequest = petId => async dispatch => {
  try {
    const res = await axios.put(`/api/pet/unrequest/${petId}`);

    dispatch({
      type: UPDATE_CLUSTER_REQUEST,
      payload: { petId, clusterRequest: res.data }
    });

    dispatch(setAlert("Pet removed from your cluster requests", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Accept Cluster Request by Shelter
export const acceptClusterRequest = (petId, userId) => async dispatch => {
  try {
    const res = await axios.put(`/api/pet/approverequest/${petId}/${userId}`);

    dispatch({
      type: UPDATE_CLUSTER,
      payload: { petId, clusterRequest: res.data }
    });

    dispatch(setAlert("Pet removed from cluster request", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Decline Cluster Request by Shelter
export const denyClusterRequest = (petId, userId) => async dispatch => {
  try {
    const res = await axios.put(`/api/pet/denyrequest/${petId}/${userId}`);

    dispatch({
      type: UPDATE_CLUSTER_REQUEST,
      payload: { petId, clusterRequest: res.data }
    });

    dispatch(setAlert("Pet removed from cluster request", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Pet
export const deletePet = id => async dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await axios.delete(`/api/pet/${id}`);

      dispatch({ type: CLEAR_PET });

      dispatch(getMyPets());

      dispatch(setAlert("This pet has been permanantly deleted"));
    } catch (err) {
      dispatch({
        type: PET_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
