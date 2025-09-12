import * as actionTypes from "./generalActionTypes";

const initialState = {
  gateways: [],
  loading: false,
  error: null,
};

const generalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_INSTALLMENT_GATEWAYS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_INSTALLMENT_GATEWAYS_SUCCESS:
      return {
        ...state,
        loading: false,
        gateways: action.payload,
      };
    case actionTypes.FETCH_INSTALLMENT_GATEWAYS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default generalReducer;
