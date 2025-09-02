import * as actionTypes from './blogActionTypes';

const initialState = {
 list: [],
 single: null,
 loading: false,
 error: null,
};

const blogReducer = (state = initialState, action) => {
 switch (action.type) {
  case actionTypes.FETCH_BLOGS_REQUEST:
  case actionTypes.FETCH_SINGLE_BLOG_REQUEST:
   return {
    ...state,
    loading: true,
    error: null,
   };
  case actionTypes.FETCH_BLOGS_SUCCESS:
   return {
    ...state,
    list: action.payload,
    loading: false,
   };
  case actionTypes.FETCH_SINGLE_BLOG_SUCCESS:
   return {
    ...state,
    single: action.payload,
    loading: false,
   };
  case actionTypes.FETCH_BLOGS_FAILURE:
  case actionTypes.FETCH_SINGLE_BLOG_FAILURE:
   return {
    ...state,
    loading: false,
    error: action.payload,
   };
  default:
   return state;
 }
};

export default blogReducer;
