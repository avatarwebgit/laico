import * as actionTypes from "./cartActionTypes";

const initialState = {
  products: [],
  count: 0,
  summary: null,
  totalPrice: 0,
  finalCart: [],
  finalPayment: 0,
  euro: 1,
  selectedAddress: null,
  paymentMethod: "",
  loading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case actionTypes.FETCH_CART_REQUEST:
    case actionTypes.ADD_TO_CART_REQUEST:
    case actionTypes.REMOVE_FROM_CART_REQUEST:
    case actionTypes.UPDATE_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.FETCH_CART_SUCCESS:
    case actionTypes.UPDATE_CART_ITEM_SUCCESS:
    case actionTypes.REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        products: action.payload.items || [],
        summary: action.payload.summary || null,
        totalPrice: action.payload.summary?.subtotal || 0,
        count :action.payload.items.length,
        loading: false,
      };

    case actionTypes.ADD_TO_CART_SUCCESS: {
      const newProducts = [...state.products, action.payload];
      return {
        ...state,
        loading: false,
        products: newProducts,
      };
    }

    case actionTypes.FETCH_CART_FAILURE:
    case actionTypes.ADD_TO_CART_FAILURE:
    case actionTypes.REMOVE_FROM_CART_FAILURE:
    case actionTypes.UPDATE_CART_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        count: action.payload.items.length,
        error: action.payload,
      };

    case actionTypes.CLEAR_CART:
      return {
        ...state,
        products: [],
        totalPrice: 0,
        summary: null,
      };

    case actionTypes.SET_CART:
      return {
        ...state,
        products: action.payload,
      };

    case actionTypes.SET_FINAL_CART:
      const finalItems = state.products.filter((el) => el.quantity !== 0);
      return {
        ...state,
        finalCart: finalItems,
        finalPayment: state.summary ? state.summary.subtotal : 0,
      };

    case actionTypes.SET_EURO_RATE:
      return {
        ...state,
        euro: action.payload,
      };

    case actionTypes.SET_SELECTED_ADDRESS:
      return {
        ...state,
        selectedAddress: action.payload,
      };
    case actionTypes.SET_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
