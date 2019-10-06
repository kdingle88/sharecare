import {
  GET_A_PET,
  GET_PETS,
  PET_ERROR,
  GET_MY_PETS,
  MY_PETS_ERROR,
  CLEAR_PET
} from "../actions/types";

const initialState = {
  pet: null,
  pets: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_A_PET:
    case GET_PETS:
    case GET_MY_PETS:
      return {
        ...state,
        pets: payload,
        loading: false
      };

    case PET_ERROR:
    case MY_PETS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    case CLEAR_PET:
      return {
        ...state,
        pet: null,
        pets: [],
        loading: false
      };

    default:
      return state;
  }
}
