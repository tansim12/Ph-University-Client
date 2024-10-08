import { createSlice } from "@reduxjs/toolkit";
type TUser = {
  id: string;
  role: string;
};

export type TInitialState = {
  user: null | TUser;
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
