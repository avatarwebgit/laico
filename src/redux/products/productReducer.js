import * as actionTypes from "./productActionTypes";

const mockProducts = [
  {
    id: "101",
    variationId: "v101",
    name: "گوشی هوشمند مدل A",
    imageUrl: "https://picsum.photos/id/101/500/500",
    finalPrice: 12500000,
    originalPrice: 13000000,
    isLiked: false,
    rating: 4.6,
    totalViews: 2300,
    isOutOfStock: false,
  },
  {
    id: "102",
    variationId: "v102",
    name: "لپتاپ گیمینگ سری X",
    imageUrl: "https://picsum.photos/id/102/500/500",
    finalPrice: 48000000,
    originalPrice: 52000000,
    isLiked: true,
    rating: 4.9,
    totalViews: 5100,
    isOutOfStock: false,
  },
  {
    id: "103",
    variationId: "v103",
    name: "هدفون بی سیم Pro",
    imageUrl: "https://picsum.photos/id/103/500/500",
    finalPrice: 3800000,
    originalPrice: 4500000,
    isLiked: false,
    rating: 4.7,
    totalViews: 8400,
    isOutOfStock: false,
  },
  {
    id: "104",
    variationId: "v104",
    name: "ساعت هوشمند Fit",
    imageUrl: "https://picsum.photos/id/104/500/500",
    finalPrice: 7200000,
    originalPrice: 7200000,
    isLiked: false,
    rating: 4.5,
    totalViews: 6200,
    isOutOfStock: false,
  },
  {
    id: "105",
    variationId: "v105",
    name: "دوربین دیجیتال Z",
    imageUrl: "https://picsum.photos/id/105/500/500",
    finalPrice: 21000000,
    originalPrice: 25000000,
    isLiked: false,
    rating: 4.8,
    totalViews: 3100,
    isOutOfStock: true,
  },
  {
    id: "106",
    variationId: "v106",
    name: "اسپیکر بلوتوثی",
    imageUrl: "https://picsum.photos/id/106/500/500",
    finalPrice: 1500000,
    originalPrice: 1500000,
    isLiked: false,
    rating: 4.4,
    totalViews: 4500,
    isOutOfStock: false,
  },
];

const initialState = {
  items: [],
  productDetails: null,
  popularProducts: [],
  latestProducts: [],
  specialOffersProducts: [],
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  console.log(state, action);
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_REQUEST:
    case actionTypes.FETCH_HOME_PRODUCTS_REQUEST:
    case actionTypes.FETCH_PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };

    case actionTypes.FETCH_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        productDetails: action.payload,
        loading: false,
      };

    case actionTypes.FETCH_HOME_PRODUCTS_SUCCESS:
      return {
        ...state,
        popularProducts: action.payload.popular || [],
        latestProducts: action.payload.latest || [],
        specialOffersProducts: action.payload.special_offers || [],
        loading: false,
      };

    case actionTypes.FETCH_PRODUCTS_FAILURE:
    case actionTypes.FETCH_PRODUCT_DETAILS_FAILURE:
    case actionTypes.FETCH_HOME_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
