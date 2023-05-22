import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import gameReducer from "./game";

const store = configureStore({
  reducer: { game: gameReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
