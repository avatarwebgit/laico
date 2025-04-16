import { createSlice } from '@reduxjs/toolkit';

const initialState = { token: localStorage.getItem('token') || null };

export const tokenSlice = createSlice({
 name: 'token',
 initialState,
 reducers: {
  set(state, action) {
   state.token = action.payload;
  },
  remove(state) {
   state.token = null;
  },
 },
});

export default tokenSlice.actions;
