import * as actionTypes from "./generalActionTypes";

export const fetchInstallmentGatewaysRequest = () => ({
  type: actionTypes.FETCH_INSTALLMENT_GATEWAYS_REQUEST,
});

export const fetchInstallmentGatewaysSuccess = (gateways) => ({
  type: actionTypes.FETCH_INSTALLMENT_GATEWAYS_SUCCESS,
  payload: gateways,
});

export const fetchInstallmentGatewaysFailure = (error) => ({
  type: actionTypes.FETCH_INSTALLMENT_GATEWAYS_FAILURE,
  payload: error,
});

export const fetchHeaderMenusRequest = (lng) => ({
  type: actionTypes.FETCH_HEADER_MENUS_REQUEST,
  payload: lng,
});

export const fetchHeaderMenusSuccess = (menus) => ({
  type: actionTypes.FETCH_HEADER_MENUS_SUCCESS,
  payload: menus,
});

export const fetchHeaderMenusFailure = (error) => ({
  type: actionTypes.FETCH_HEADER_MENUS_FAILURE,
  payload: error,
});

export const fetchCountriesRequest = () => ({
  type: actionTypes.FETCH_COUNTRIES_REQUEST,
});

export const fetchCountriesSuccess = (countries) => ({
  type: actionTypes.FETCH_COUNTRIES_SUCCESS,
  payload: countries,
});

export const fetchCountriesFailure = (error) => ({
  type: actionTypes.FETCH_COUNTRIES_FAILURE,
  payload: error,
});

export const fetchSearchRequest = (query) => ({
  type: actionTypes.FETCH_SEARCH_REQUEST,
  payload: query,
});

export const fetchSearchSuccess = (results) => ({
  type: actionTypes.FETCH_SEARCH_SUCCESS,
  payload: results,
});

export const fetchSearchFailure = (error) => ({
  type: actionTypes.FETCH_SEARCH_FAILURE,
  payload: error,
});
