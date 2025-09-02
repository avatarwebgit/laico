import * as actionTypes from './authActionTypes';

const initialState = {
 user: null,
 token: null,
 loading: false,
 error: null,
 isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
 switch (action.type) {
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
    user: action.payload.user,
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

  case actionTypes.LOGIN_FAILURE:
  case actionTypes.REGISTER_FAILURE:
  case actionTypes.LOGOUT_FAILURE:
   return {
    ...state,
    loading: false,
    error: action.payload,
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
