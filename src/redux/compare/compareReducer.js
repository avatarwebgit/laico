import * as actionTypes from "./compareActionTypes";

const initialState = {
  items: [],
};

const compareReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_COMPARE_SUCCESS:

    if (state.items.find((item) => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case actionTypes.REMOVE_FROM_COMPARE_SUCCESS:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case actionTypes.CLEAR_COMPARE_SUCCESS:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

export default compareReducer;
