import {
  REQUEST_LOADED,
  ADD_REQUEST_SUCCESS,
  ADD_REQUEST_FAIL,
  UPDATE_REQUEST_SUCCESS,
  UPDATE_REQUEST_FAIL,
  DELETE_REQUEST_SUCCESS,
  DELETE_REQUEST_FAIL,
  ALL_REQUESTS_LOADED,
} from "../actions/types";

const initialState = {
  allRequests: null,
  request: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REQUEST_LOADED:
      return {
        ...state,
        request: payload,
        loading: false,
      };

    case ALL_REQUESTS_LOADED:
      return {
        ...state,
        allRequests: payload,
        loading: false,
      };

    default:
      return state;
  }
}
