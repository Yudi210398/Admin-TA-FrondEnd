import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice.js";
import LoginSlice from "./LoginSlice";

export const store = configureStore({
  reducer: { outNav: AuthSlice, authLogin: LoginSlice },
});
