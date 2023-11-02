import { SERVER_URL } from "../ServerUrl";
import axios from "axios";
import Cookies from "universal-cookie";

// Common
import { Alert } from "../admin/common/Alert";
import {
  EXCLUSIVE_TRIPS_LOADED,
  REGULAR_TRIPS_LOADED,
  ADD_TRIP_SUCCESS,
  ADD_TRIP_FAIL,
  UPDATE_TRIP_FAIL,
  UPDATE_TRIP_SUCCESS,
  DELETE_TRIP_FAIL,
  DELETE_TRIP_SUCCESS,
  ALL_TRIPS_LOADED,
  TRIP_LOADED,
} from "./types";
import setAuthToken from "../admin/utils/setAuthToken";
const cookies = new Cookies();

export const getAllTrips = () => async (dispatch) => {
  try {
    const res = await axios.get(`${SERVER_URL}/trip/`);

    dispatch({
      type: ALL_TRIPS_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTripById = (tripId) => async (dispatch) => {
  try {
    const res = await axios.get(`${SERVER_URL}/trip/${tripId}`);

    dispatch({
      type: TRIP_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getExclusiveTrips = () => async (dispatch) => {
  try {
    const res = await axios.get(`${SERVER_URL}/trip/exclusive-trips`);

    dispatch({
      type: EXCLUSIVE_TRIPS_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    Alert("error", "Exclusive Trips not loaded");
  }
};

export const getRegularTrips = () => async (dispatch) => {
  try {
    const res = await axios.get(`${SERVER_URL}/trip/regular-trips`);

    dispatch({
      type: REGULAR_TRIPS_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    Alert("error", "Regular Trips not loaded");
  }
};

// Add trip
export const addTrip = (obj) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }

  const body = JSON.stringify(obj);

  try {
    const res = await axios.post(`${SERVER_URL}/trip/`, body, config);

    dispatch({
      type: ADD_TRIP_SUCCESS,
      payload: res.data,
    });

    Alert("success", "Trip added");
  } catch (error) {
    dispatch({
      type: ADD_TRIP_FAIL,
    });

    Alert("error", "Trip not added");
  }
};

// Update trip
export const updateTrip =
  ({ obj, ID }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (sessionStorage.token) {
      setAuthToken(sessionStorage.token);
    }

    const body = JSON.stringify(obj);

    try {
      const res = await axios.patch(`${SERVER_URL}/trip/${ID}`, body, config);

      dispatch({
        type: UPDATE_TRIP_SUCCESS,
        payload: res.data,
      });

      Alert("success", "Trip updated");
    } catch (error) {
      dispatch({
        type: UPDATE_TRIP_FAIL,
      });

      Alert("error", "Trip not updated");
    }
  };

// Delete trip
export const deleteTrip = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }

  try {
    const res = await axios.delete(`${SERVER_URL}/trip/${id}`, config);

    dispatch({
      type: DELETE_TRIP_SUCCESS,
      payload: res.data,
    });

    Alert("success", "Trip deleted");
  } catch (error) {
    dispatch({
      type: DELETE_TRIP_FAIL,
    });

    Alert("error", "Trip deleted");
  }
};
