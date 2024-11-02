// src/redux/actions/recipeActions.js
import axios from 'axios';
import {
  fetchRecipesRequest,
  fetchRecipesSuccess,
  fetchRecipesFailure,
  fetchRecipeDetailsRequest,
  fetchRecipeDetailsSuccess,
  fetchRecipeDetailsFailure,
} from '../reducers/recipesReducer'; // Asegúrate de importar las acciones

export const fetchRecipes = (searchParams) => {
  return async (dispatch) => {
    dispatch(fetchRecipesRequest());
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?${searchParams}&apiKey=78a1b697d08d49079386d8f2a90ec0b4`);
      dispatch(fetchRecipesSuccess(response.data.results));
    } catch (error) {
      dispatch(fetchRecipesFailure(error.message));
    }
  };
};

// Nueva acción para obtener los detalles de una receta y sus ingredientes
export const fetchRecipeDetails = (id) => {
  return async (dispatch) => {
    dispatch(fetchRecipeDetailsRequest());
    try {
      // Obtener los detalles de la receta
      const recipeResponse = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=78a1b697d08d49079386d8f2a90ec0b4`);
      // Obtener los ingredientes de la receta
      const ingredientsResponse = await axios.get(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=78a1b697d08d49079386d8f2a90ec0b4`);

      // Combinar los datos de la receta y los ingredientes
      const recipeData = {
        ...recipeResponse.data,
        ingredients: ingredientsResponse.data.ingredients, // Aquí se agregan los ingredientes
      };

      dispatch(fetchRecipeDetailsSuccess(recipeData)); // Despacha los detalles de la receta obtenida
    } catch (error) {
      dispatch(fetchRecipeDetailsFailure(error.message)); // Maneja el error
    }
  };
};

