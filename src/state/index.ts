import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

// import bondReducer from "./bond";
// import farmsReducer from "./farms";
// import jungleFarmsReducer from "./jungleFarms";

const store = configureStore({
  reducer: {},
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
