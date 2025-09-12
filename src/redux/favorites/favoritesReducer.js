import * as actionTypes from "./favoritesActionTypes";

const initialState = {
  items: [],
  count: 0,
  loading: false,
  error: null,
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FAVORITES_REQUEST:
    case actionTypes.ADD_TO_FAVORITES_REQUEST:
    case actionTypes.REMOVE_FROM_FAVORITES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.FETCH_FAVORITES_SUCCESS:
      return {
        ...state,
        items: action.payload,
        count: action.payload.length,
        loading: false,
      };

    case actionTypes.ADD_TO_FAVORITES_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        count: state.count + 1,
        loading: false,
      };

    case actionTypes.REMOVE_FROM_FAVORITES_SUCCESS:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        count: state.count - 1,
        loading: false,
      };

    case actionTypes.FETCH_FAVORITES_FAILURE:
    case actionTypes.ADD_TO_FAVORITES_FAILURE:
    case actionTypes.REMOVE_FROM_FAVORITES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case actionTypes.SET_FAVORITES_COUNT:
      return {
        ...state,
        count: action.payload,
      };

    default:
      return state;
  }
};

export default favoritesReducer;
