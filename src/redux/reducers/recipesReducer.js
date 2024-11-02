// src/redux/reducers/recipesReducer.js
import { createSlice } from '@reduxjs/toolkit';

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    loading: false,
    error: null,
    recipeDetails: null, // Para almacenar los detalles de la receta
    loadingDetails: false, // Para manejar la carga de los detalles
    errorDetails: null, // Para manejar errores en la carga de detalles
  },
  reducers: {
    addRecipe: (state, action) => {
      state.recipes.push(action.payload);
    },
    removeRecipe: (state, action) => {
      state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload);
    },
    fetchRecipesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRecipesSuccess: (state, action) => {
      state.loading = false;
      state.recipes = action.payload; // Almacena las recetas en el estado
    },
    fetchRecipesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchRecipeDetailsRequest: (state) => {
      state.loadingDetails = true;
      state.errorDetails = null;
    },
    fetchRecipeDetailsSuccess: (state, action) => {
      state.loadingDetails = false;
      state.recipeDetails = action.payload; // Almacena los detalles de la receta en el estado
    },
    fetchRecipeDetailsFailure: (state, action) => {
      state.loadingDetails = false;
      state.errorDetails = action.payload;
    },
  },
});

export const {
  addRecipe,
  removeRecipe,
  fetchRecipesRequest,
  fetchRecipesSuccess,
  fetchRecipesFailure,
  fetchRecipeDetailsRequest,
  fetchRecipeDetailsSuccess,
  fetchRecipeDetailsFailure,
} = recipesSlice.actions;

export default recipesSlice.reducer;