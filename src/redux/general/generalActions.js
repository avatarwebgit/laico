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
