import { useHistory } from "react-router-dom";
import { SERVER_URL } from "../ServerUrl";
import {
  PAST_BOOKINGS_LOADED,
  UPCOMING_BOOKINGS_LOADED,
  ADD_BOOKING_FAIL,
  ADD_BOOKING_SUCCESS,
} from "./types";
// Common
import { Alert } from "../admin/common/Alert";
// Axios
import axios from "axios";
// Redux
import setAuthToken from "../admin/utils/setAuthToken";

export const addBooking = (bookingObj) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }

  const body = JSON.stringify(bookingObj);

  try {
    const res = await axios.post(
      `${SERVER_URL}/bookings/bookSeats`,
      body,
      config
    );

    dispatch({
      type: ADD_BOOKING_SUCCESS,
      payload: res.data,
    });

    Alert("success", "Booking added");
    /*    window.location.reload() */
  } catch (error) {
    dispatch({
      type: ADD_BOOKING_FAIL,
    });
  }
};

export const getBookings = () => async (dispatch) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }

  try {
    const res = await axios.get(`${SERVER_URL}/bookings/myBookings`);

    dispatch({
      type: UPCOMING_BOOKINGS_LOADED,
      payload: res.data.upcomingBookings,
    });

    dispatch({
      type: PAST_BOOKINGS_LOADED,
      payload: res.data.pastBookings,
    });
  } catch (error) {
    Alert("error", "Bookings are not loaded");
  }
};
