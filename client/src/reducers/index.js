import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import pet from "./pet";

export default combineReducers({
  alert,
  auth,
  profile,
  pet
});
