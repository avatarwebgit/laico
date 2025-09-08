import * as actionTypes from "./cartActionTypes";

const initialState = {
  products: [],
  totalPrice: 0,
  totalPriceAfterDiscount: 0,
  finalCart: [],
  finalPayment: 0,
  euro: 1,
  selectedAddress: null,
  paymentMethod: "",
  loading: false,
  error: null,
};

const calculateTotalPrice = (items) => {
  return items.reduce((total, product) => {
    const price =
      typeof product.sale_price === "number" ? product.sale_price : 0;
    const quantity =
      typeof product.selected_quantity === "number"
        ? product.selected_quantity
        : 0;
    return total + quantity * price;
  }, 0);
};

const cartReducer = (state = initialState, action) => {
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
      return {
        ...state,
        products: action.payload,
        totalPrice: calculateTotalPrice(action.payload),
        loading: false,
      };

    case actionTypes.ADD_TO_CART_SUCCESS: {
      const newProducts = [...state.products, action.payload];
      return {
        ...state,
        loading: false,
        products: newProducts,
        totalPrice: calculateTotalPrice(newProducts),
      };
    }

    case actionTypes.REMOVE_FROM_CART_SUCCESS: {
      const newProducts = state.products.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        products: newProducts,
        totalPrice: calculateTotalPrice(newProducts),
        loading: false,
      };
    }

    case actionTypes.UPDATE_CART_ITEM_SUCCESS: {
      // The API should return the whole cart, so we just set it
      const newProducts = action.payload;
      return {
        ...state,
        products: newProducts,
        totalPrice: calculateTotalPrice(newProducts),
        loading: false,
      };
    }

    case actionTypes.FETCH_CART_FAILURE:
    case actionTypes.ADD_TO_CART_FAILURE:
    case actionTypes.REMOVE_FROM_CART_FAILURE:
    case actionTypes.UPDATE_CART_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case actionTypes.CLEAR_CART:
      return {
        ...state,
        products: [],
        totalPrice: 0,
      };

    case actionTypes.SET_CART:
      return {
        ...state,
        products: action.payload,
        totalPrice: calculateTotalPrice(action.payload),
      };

    case actionTypes.SET_FINAL_CART:
      const finalItems = state.products.filter(
        (el) => el.selected_quantity !== 0
      );
      return {
        ...state,
        finalCart: finalItems,
        finalPayment: state.totalPrice,
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
