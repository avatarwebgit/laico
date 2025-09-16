import * as actionTypes from "./initialStateActionTypes";

export const fetchInitialStateRequest = () => ({
  type: actionTypes.FETCH_INITIAL_STATE_REQUEST,
});

export const fetchInitialStateSuccess = (settings) => ({
  type: actionTypes.FETCH_INITIAL_STATE_SUCCESS,
  payload: settings,
});

export const fetchInitialStateFailure = (error) => ({
  type: actionTypes.FETCH_INITIAL_STATE_FAILURE,
  payload: error,
});