import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 products: [],
 totalPrice: 0,
 totalPriceAfterDiscount: 0,
 finalCart: [],
 finalPayment: 0,
 euro: 0,
 allAddresses: [],
 selectedAddress: [],
 paymentMethod: '',
};

const cartSlice = createSlice({
 name: 'cart',
 initialState,
 reducers: {
  set(state, action) {
   state.products = action.payload;
   state.totalPrice = state.products.reduce((total, product) => {
    return total + product.selected_quantity * product.sale_price;
   }, 0);
  },
  add(state, action) {
   if (
    !state.products.find(
     el => +el.variation_id === +action.payload.variation_id,
    )
   ) {
    state.products.push(action.payload);
   }
   state.totalPrice = state.products.reduce((total, product) => {
    return total + product.selected_quantity * product.sale_price;
   }, 0);
  },

  remove(state, action) {
   state.products = state.products.filter(
    el => +el.variation_id !== +action.payload.variation_id,
   );
   state.totalPrice = state.products.reduce((total, product) => {
    return total + product.selected_quantity * product.sale_price;
   }, 0);
  },

  increment(state, action) {
   const product = state.products.find(
    el => +el.variation_id === +action.payload.variation_id,
   );
   if (product) {
    product.selected_quantity += 1;
   }
   state.totalPrice = state.products.reduce((total, product) => {
    return total + product.selected_quantity * product.sale_price;
   }, 0);
  },

  setQuantity(state, action) {
   const product = state.products.find(
    el => +el.variation_id === +action.payload.id,
   );

   if (product) {
    product.selected_quantity = action.payload.quantity;
   }

   state.totalPrice = state.products.reduce((total, product) => {
    return total + product.selected_quantity * product.sale_price;
   }, 0);
  },

  decrement(state, action) {
   const product = state.products.find(
    el => +el.variation_id === +action.payload.variation_id,
   );
   if (product && product.selected_quantity > 0) {
    product.selected_quantity -= 1;
   }
   state.totalPrice = state.products.reduce((total, product) => {
    return total + product.selected_quantity * product.sale_price;
   }, 0);
  },

  calculateTotalPrice(state) {
   state.totalPrice = state.products.reduce((total, product) => {
    return total + product.selected_quantity * product.sale_price;
   }, 0);
  },

  setTotalPriceAfterDiscout(state, action) {
   state.totalPriceAfterDiscount = action.payload;
  },

  setFinalCart(state, action) {
   state.finalCart = state.products.filter(el => el.selected_quantity !== 0);
   state.finalPayment = state.totalPrice;
  },
  setEuro(state, action) {
   state.euro = action.payload;
  },
  setAllAddresses(state, action) {
   state.allAddresses = action.payload;
  },
  setSelectedAddress(state, action) {
   state.selectedAddress = action.payload;
  },
  setPaymentMethod(state, action) {
   state.paymentMethod = action.payload;
  },
  setTotalPrice(state, action) {
   state.totalPrice = action.payload;
  },
 },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
