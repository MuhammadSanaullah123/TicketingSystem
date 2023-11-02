import { useHistory } from "react-router-dom";
import { SERVER_URL } from "../ServerUrl";
import {
  ALL_OPERATORS_LOADED,
  ALL_OPERATORS_FAIL,
  VERIFY_OPERATOR_FAIL,
  VERIFY_OPERATOR_SUCCESS,
  DELETE_OPERATOR_FAIL,
  DELETE_OPERATOR_SUCCESS,
  OPERATOR_FAIL,
  OPERATOR_LOADED,
} from "./types";
// Common
import { Alert } from "../admin/common/Alert";
// Axios
import axios from "axios";
// Redux
import setAuthToken from "../admin/utils/setAuthToken";

// Get All operators
export const getAllOperators = () => async (dispatch) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }
  try {
    const res = await axios.get(`${SERVER_URL}/admin/operator/all`);

    dispatch({
      type: ALL_OPERATORS_LOADED,
      payload: res.data.operators,
    });
  } catch (error) {
    dispatch({
      type: ALL_OPERATORS_FAIL,
    });

    Alert("error", "Operators are not loaded");
  }
};

// Get operator by ID
export const getOperatorById = (operatorId) => async (dispatch) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }
  try {
    const res = await axios.get(`${SERVER_URL}/operator/${operatorId}`);

    dispatch({
      type: OPERATOR_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: OPERATOR_FAIL,
    });

    Alert("error", "Operator not loaded");
  }
};

export const verifyOperator = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }

  try {
    const res = await axios.post(
      `${SERVER_URL}/admin/verifyOperator/${id}`,
      config
    );

    dispatch({
      type: VERIFY_OPERATOR_SUCCESS,
      payload: res.data,
    });

    Alert("success", "Operator verified");
  } catch (error) {
    dispatch({
      type: VERIFY_OPERATOR_FAIL,
    });

    Alert("error", "Operator not verified");
  }
};

export const deleteOperator = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }

  try {
    const res = await axios.delete(
      `${SERVER_URL}/admin/deleteUser/${id}`,
      config
    );

    dispatch({
      type: DELETE_OPERATOR_SUCCESS,
      payload: res.data,
    });

    Alert("success", "Operator deleted");
  } catch (error) {
    dispatch({
      type: DELETE_OPERATOR_FAIL,
    });

    Alert("error", "Operator not deleted");
  }
};
