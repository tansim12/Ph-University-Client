import { createSlice } from "@reduxjs/toolkit";

export type TInitialState = {
  user: null | object;
  token: null | string;
};

const initialState: TInitialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      (state.user = user), (state.token = token);
    },
    logout: (state) => {
      (state.user = null), (state.token = null);
    },
  },
});
export const { setUser, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
