import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 cartDrawer: false,
 favoritesDrawer: false,
 redirectAfterLogin: null,
};

const drawerSlice = createSlice({
 name: 'drawer',
 initialState,
 reducers: {
  cartOpen(state) {
   state.cartDrawer = true;
  },
  cartClose(state) {
   state.cartDrawer = false;
  },
  favoritesOpen(state) {
   state.favoritesDrawer = true;
  },
  favoritesClose(state) {
   state.favoritesDrawer = false;
  },
  setRedirectAfterLogin: (state, action) => {
   state.redirectAfterLogin = action.payload;
  },
  clearRedirectAfterLogin: state => {
   state.redirectAfterLogin = null;
  },
 },
});

export const drawerActions = drawerSlice.actions;

export default drawerSlice;
