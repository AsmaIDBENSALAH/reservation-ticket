import { configureStore } from "@reduxjs/toolkit";
import competitionsReducer from "./slices/competitionsSlice";
import matchesReducer from "./slices/matchesSlice";

export const store = configureStore({
  reducer: {
    matches: matchesReducer,
    competitions: competitionsReducer,
  },
});

export default store;
