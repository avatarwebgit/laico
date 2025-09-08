import * as actionTypes from './modalActionTypes';

const initialState = {
  isOpen: false,
  title: '',
  message: '',
  confirmAction: null,
  isLoading: false,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_DELETE_MODAL:
      return {
        ...state,
        isOpen: true,
        title: action.payload.title,
        message: action.payload.message,
        confirmAction: action.payload.confirmAction,
        isLoading: false,
      };
    case actionTypes.CLOSE_DELETE_MODAL:
      return {
        ...initialState, 
      };
    case actionTypes.SET_MODAL_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default modalReducer;