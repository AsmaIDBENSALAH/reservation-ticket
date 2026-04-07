import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import competitionsReducer from "../features/competitions/competitionSlice";
import countriesReducer from "../features/countries/countriesSlice";
import citiesReducer from "../features/cities/citySlice";
import stadiumsReducer from "../features/stadiums/stadiumSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    competitions: competitionsReducer,
    countries: countriesReducer,
    cities: citiesReducer,
    stadiums: stadiumsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
