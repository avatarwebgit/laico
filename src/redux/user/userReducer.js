import * as actionTypes from "./userActionTypes";

const initialState = {
  profile: null,
  loading: false,
  token: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_PROFILE_REQUEST:
    case actionTypes.UPDATE_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.FETCH_USER_PROFILE_SUCCESS:
    case actionTypes.UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };

    case actionTypes.FETCH_USER_PROFILE_FAILURE:
    case actionTypes.UPDATE_USER_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
