import { configureStore } from '@reduxjs/toolkit';
import matchesReducer from './slices/matchesSlice';
import competitionsReducer from './slices/competitionsSlice';

export const store = configureStore({
  reducer: {
    matches: matchesReducer,
    competitions: competitionsReducer,
  },
});

export default store;
