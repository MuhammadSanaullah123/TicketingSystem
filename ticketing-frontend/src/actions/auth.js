import { navigateTo } from "../operator/common/navigationService";
import { SERVER_URL } from "../ServerUrl";
import {
  AUTH_LOADED,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  ALL_CUSTOMER_ERROR,
  ALL_CUSTOMERS_LOADED,
  OPERATOR_LOGIN_SUCCESS,
  OPERATOR_LOGIN_FAIL,
  OPERATOR_SIGNUP_FAIL,
  OPERATOR_SIGNUP_SUCCESS,
} from "./types";
// Common
import { Alert } from "../admin/common/Alert";
// Axios
import axios from "axios";
// Redux
import setAuthToken from "../admin/utils/setAuthToken";

// Load User
export const loadUser = () => async (dispatch) => {
  if (sessionStorage.token) {
    console.log("working?");
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`${SERVER_URL}/auth`);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Login admin
export const adminLogin =
  ({ email, password, history }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post(`${SERVER_URL}/admin/login`, body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      Alert("success", `Login Successful`);

      sessionStorage.setItem("token", res.data.authToken);
      console.log("res.data.authToken", res.data.authToken);
      setAuthToken(res.data.authToken);

      history.push("/admin/dashboard");
    } catch (err) {
      // const errors = err.response.data.errors

      // if(errors) {
      //     errors.forEach(error => Alert('error', `${error.msg}`))
      // }
      Alert("error", "Login failed");
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

export const loadAllCustomers = () => async (dispatch) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }

  try {
    const res = await axios.get(`${SERVER_URL}/admin/customer`);

    dispatch({
      type: ALL_CUSTOMERS_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_CUSTOMER_ERROR,
    });

    Alert("error", "Customers are not loaded");
  }
};

export const operatorSignup = (signupObj) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(signupObj);

  try {
    const res = await axios.post(
      `${SERVER_URL}/operator/createOperator`,
      body,
      config
    );

    dispatch({
      type: OPERATOR_SIGNUP_SUCCESS,
      payload: res.data,
    });

    Alert("success", `Signup Operator Successful`);

    window.location.href = "/operator/login";
  } catch (err) {
    // const errors = err.response.data.errors

    // if(errors) {
    //     errors.forEach(error => Alert('error', `${error.msg}`))
    // }
    Alert("error", "Signup Operator failed");
    dispatch({
      type: OPERATOR_SIGNUP_FAIL,
    });
  }
};

export const loginOperator =
  ({ loginObj, history }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(loginObj);

    try {
      const res = await axios.post(
        `${SERVER_URL}/operator/login`,
        body,
        config
      );

      if (res.data.success === false) {
        // if operator is not verified
        Alert("error", `${res.data.message}`);
      } else {
        dispatch({
          type: OPERATOR_LOGIN_SUCCESS,
          payload: res.data,
        });

        sessionStorage.setItem("token", res.data.authToken);

        Alert("success", `Login Operator Successful`);

        setInterval(() => {
          navigateTo("/operator/dashboard");
          window.location.reload();
        }, 1000);
      }
      console.log(res.data);
    } catch (err) {
      // const errors = err.response.data.errors

      // if(errors) {
      //     errors.forEach(error => Alert('error', `${error.msg}`))
      // }
      console.log(err);
      Alert("error", "Login Operator failed");
      dispatch({
        type: OPERATOR_LOGIN_FAIL,
      });
    }
  };
