// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './reducers/recipesReducer';

const store = configureStore({
  reducer: {
    recipes: recipesReducer,
  },
});

export default store;