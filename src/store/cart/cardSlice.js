import { createSlice } from '@reduxjs/toolkit';

const initialState = { products: [], totalPrice: 0 };

export const cardSlice = createSlice({
 name: 'token',
 initialState,
 reducers: {
  set(state, action) {
   state.products = action.payload();
  },
 },
});
const cartActions = cardSlice.actions;

export default cartActions;
