import { SERVER_URL } from "../ServerUrl";
import axios from "axios";

// Common
import { Alert } from "../admin/common/Alert";
import {
  REQUEST_LOADED,
  ADD_REQUEST_SUCCESS,
  ADD_REQUEST_FAIL,
  UPDATE_REQUEST_SUCCESS,
  UPDATE_REQUEST_FAIL,
  DELETE_REQUEST_SUCCESS,
  DELETE_REQUEST_FAIL,
  ALL_REQUESTS_LOADED,
} from "./types";
import setAuthToken from "../admin/utils/setAuthToken";

export const getAllRequests = () => async (dispatch) => {
  try {
    const res = await axios.get(`${SERVER_URL}/request/`);

    dispatch({
      type: ALL_REQUESTS_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

/* export const getTripById = (tripId) => async (dispatch) => {
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
 */

// Add request
export const addRequest = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }

  const body = JSON.stringify(data);

  try {
    console.log(data);
    const res = await axios.post(`${SERVER_URL}/request/`, body, config);

    dispatch({
      type: ADD_REQUEST_SUCCESS,
      payload: res.data,
    });

    Alert("success", "Request added");
  } catch (error) {
    dispatch({
      type: ADD_REQUEST_FAIL,
    });

    Alert("error", "Request not added");
  }
};

// Update updateRequest
export const updateRequest = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }

  try {
    const res = await axios.patch(`${SERVER_URL}/request/${id}`, config);

    dispatch({
      type: UPDATE_REQUEST_SUCCESS,
      payload: res.data,
    });

    Alert("success", "Request updated");
  } catch (error) {
    dispatch({
      type: UPDATE_REQUEST_FAIL,
    });

    Alert("error", "Request not updated");
  }
};
/* 
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
 */
