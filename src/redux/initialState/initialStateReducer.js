import * as actionTypes from "./initialStateActionTypes";

const initialState = {
  settings: {},
  loading: false,
  error: null,
};

const formatSettings = (items) => {
  const settings = {};
  if (Array.isArray(items)) {
    items.forEach((item) => {
      settings[item.key] = item.value;
    });
  }
  return settings;
};

const initialStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_INITIAL_STATE_REQUEST:
      return { ...state, loading: true, error: null };
    case actionTypes.FETCH_INITIAL_STATE_SUCCESS:
      return {
        ...state,
        loading: false,
        settings: formatSettings(action.payload),
      };
    case actionTypes.FETCH_INITIAL_STATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default initialStateReducer;