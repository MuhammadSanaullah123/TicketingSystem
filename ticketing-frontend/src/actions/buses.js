import { useHistory } from "react-router-dom";
import { SERVER_URL } from "../ServerUrl";
import {
  ALL_BUSES_LOADED,
  ALL_BUSES_FAIL,
  ADD_BUS_SUCCESS,
  ADD_BUS_FAIL,
  UPDATE_BUS_SUCCESS,
  UPDATE_BUS_FAIL,
} from "./types";
// Common
import { Alert } from "../admin/common/Alert";
// Axios
import axios from "axios";
// Redux
import setAuthToken from "../admin/utils/setAuthToken";

// Get All Buses
export const getAllBuses = () => async (dispatch) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }

  try {
    const res = await axios.get(`${SERVER_URL}/bus`);

    dispatch({
      type: ALL_BUSES_LOADED,
      payload: res.data.bus,
    });
  } catch (error) {
    dispatch({
      type: ALL_BUSES_FAIL,
    });

    Alert("error", "Buses are not loaded");
  }
};

// Get All Buses
export const searchBuses = (formData) => async (dispatch) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }

  try {
    const res = await axios.get(
      `${SERVER_URL}/bus/?routeFrom=${formData.from}&routeTo=${formData.to}&date=${formData.date}`
    );
    console.log(res);
    dispatch({
      type: ALL_BUSES_LOADED,
      payload: res.data.bus,
    });
  } catch (error) {
    dispatch({
      type: ALL_BUSES_FAIL,
    });

    Alert("error", "Buses are not loaded");
  }
};

// Add bus
export const addBus = (bus) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }
  console.log(bus);
  const body = JSON.stringify(bus);

  try {
    const res = await axios.post(`${SERVER_URL}/bus`, body, config);

    dispatch({
      type: ADD_BUS_SUCCESS,
      payload: res.data,
    });

    Alert("success", "Bus added");
    /*  window.location.reload(); */
  } catch (error) {
    dispatch({
      type: ADD_BUS_FAIL,
    });
  }
};

// Update bus
export const updateBus =
  ({ busData, ID }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (sessionStorage.token) {
      setAuthToken(sessionStorage.token);
    }

    const body = JSON.stringify(busData);

    try {
      const res = await axios.patch(`${SERVER_URL}/bus/${ID}`, body, config);

      dispatch({
        type: UPDATE_BUS_SUCCESS,
        payload: res.data,
      });

      Alert("success", "Bus updated");

      /*       window.location.reload(); */
    } catch (error) {
      dispatch({
        type: UPDATE_BUS_FAIL,
      });

      Alert("error", "Bus is not updated");
    }
  };

// Delete bus
export const deleteBus = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }

  try {
    const res = await axios.delete(`${SERVER_URL}/bus/${id}`, config);

    dispatch({
      type: UPDATE_BUS_SUCCESS,
      payload: res.data,
    });

    Alert("success", "Bus deleted");
    /*    window.location.reload(); */
  } catch (error) {
    dispatch({
      type: UPDATE_BUS_FAIL,
    });

    Alert("error", "Bus deleted");
  }
};
