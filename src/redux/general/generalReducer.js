import * as actionTypes from "./generalActionTypes";

const initialState = {
  gateways: [],
  loading: false,
  error: null,

  headerMenus: [],
  menusLoading: false,
  menusError: null,

  countries: [],
  countriesLoading: false,
  countriesError: null,

  searchResults: [],
  searchLoading: false,
  searchError: null,
};

const generalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_INSTALLMENT_GATEWAYS_REQUEST:
      return { ...state, loading: true, error: null };
    case actionTypes.FETCH_INSTALLMENT_GATEWAYS_SUCCESS:
      return { ...state, loading: false, gateways: action.payload };
    case actionTypes.FETCH_INSTALLMENT_GATEWAYS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case actionTypes.FETCH_HEADER_MENUS_REQUEST:
      return { ...state, menusLoading: true, menusError: null };
    case actionTypes.FETCH_HEADER_MENUS_SUCCESS:
      return { ...state, menusLoading: false, headerMenus: action.payload };
    case actionTypes.FETCH_HEADER_MENUS_FAILURE:
      return { ...state, menusLoading: false, menusError: action.payload };

    case actionTypes.FETCH_COUNTRIES_REQUEST:
      return { ...state, countriesLoading: true, countriesError: null };
    case actionTypes.FETCH_COUNTRIES_SUCCESS:
      return { ...state, countriesLoading: false, countries: action.payload };
    case actionTypes.FETCH_COUNTRIES_FAILURE:
      return {
        ...state,
        countriesLoading: false,
        countriesError: action.payload,
      };

    case actionTypes.FETCH_SEARCH_REQUEST:
      return { ...state, searchLoading: true, searchError: null };
    case actionTypes.FETCH_SEARCH_SUCCESS:
      return { ...state, searchLoading: false, searchResults: action.payload };
    case actionTypes.FETCH_SEARCH_FAILURE:
      return { ...state, searchLoading: false, searchError: action.payload };

    default:
      return state;
  }
};

export default generalReducer;
