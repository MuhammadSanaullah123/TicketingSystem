import { combineReducers } from "redux";
import trips from "./trips";
import buses from "./buses";
import request from "./request";
import auth from "./auth";
import operators from "./operators";
import bookings from "./bookings";
import userReducer from "../Redux/userReducer";
/* import { userReducer } from '../Redux/userReducer' */

export default combineReducers({
  trips,
  buses,
  auth,
  operators,
  bookings,
  request,
  userReducer,
});
