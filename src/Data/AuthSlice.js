import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    contenOutNav: false,
  },
  reducers: {
    isContenOutNav: (state, action) => {
      state.contenOutNav = action.payload.contenOutNav;
    },
  },
});

export const { isContenOutNav, isLogin } = authSlice.actions;
export default authSlice.reducer;
