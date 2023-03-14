import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: {
    tokenLogin: null,
    refreshToken: null,
    login: false,
    totalData: 0,
  },
  reducers: {
    isLogin: (state, action) => {
      state.tokenLogin = action.payload.tokenLogin;
      state.refreshToken = action.payload.refreshToken;
      state.login = action.payload.login;
    },
    isLogout: (state) => {
      state.tokenLogin = null;
      state.refreshToken = null;
      state.login = false;
    },
    isTotalDataHapus: (state, action) => {
      state.totalData = action.payload.totalData;
    },
  },
});

export const { isLogin, isLogout, isTotalDataHapus } = loginSlice.actions;
export default loginSlice.reducer;
