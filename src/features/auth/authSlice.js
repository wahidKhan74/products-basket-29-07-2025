import { createSlice } from '@reduxjs/toolkit';

const loggedInUser = JSON.parse(localStorage.getItem('user')) || null;

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: loggedInUser },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;