import {
  GET_A_PET,
  GET_PETS,
  PET_ERROR,
  GET_MY_PETS,
  GET_MY_PENDING_PETS,
  MY_PETS_ERROR,
  CLEAR_PET,
  UPDATE_CLUSTER_REQUEST,
  UPDATE_CLUSTER
} from "../actions/types";

const initialState = {
  pet: null,
  pets: [], // cluster or managed pets/ cluster Request(user, shelter)
  pendingPets: [], // Pending requests(user)
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_A_PET:
      return {
        ...state,
        pet: payload,
        loading: false
      };

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

    case GET_MY_PENDING_PETS:
      return {
        ...state,
        pendingPets: payload,
        loading: false
      };

    case UPDATE_CLUSTER_REQUEST:
      return {
        ...state,
        pets: state.pets.map(pet =>
          pet._id === payload.petId
            ? { ...pet, clusterRequest: payload.clusterRequest }
            : pet
        ),
        loading: false
      };
    case UPDATE_CLUSTER:
      return {
        ...state,
        pets: state.pets.map(pet =>
          pet._id === payload.petId ? { ...pet, cluster: payload.cluster } : pet
        ),
        loading: false
      };

    default:
      return state;
  }
}
