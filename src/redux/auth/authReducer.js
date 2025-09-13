import * as actionTypes from "./authActionTypes";

const initialState = {
  user: null,
  token: localStorage.getItem("authToken")
    ? JSON.parse(localStorage.getItem("authToken"))
    : null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("authToken"),
  otpExpiration: null,
};

const authReducer = (state = initialState, action) => {
  console.log(state, action);
  switch (action.type) {
    case actionTypes.SEND_OTP_REQUEST:
    case actionTypes.VERIFY_OTP_REQUEST:
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.REGISTER_REQUEST:
    case actionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };

    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    case actionTypes.SEND_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        otpExpiration: Date.now() + action.payload.remainingTime * 1000,
      };

    case actionTypes.SEND_OTP_FAILURE:
    case actionTypes.LOGIN_FAILURE:
    case actionTypes.REGISTER_FAILURE:
    case actionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: !!action.payload,
      };

    case actionTypes.REMOVE_TOKEN:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default authReducer;
