"use client";

import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./main-slice";

export const store = configureStore({
  reducer: {
    main: mainSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
