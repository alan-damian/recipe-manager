// src/localStorage.js

export const saveRecipe = (recipe) => {
  const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
  savedRecipes.push(recipe);
  localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
};

export const getSavedRecipes = () => {
  return JSON.parse(localStorage.getItem('savedRecipes')) || [];
};

export const removeRecipe = (id) => {
  const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
  const updatedRecipes = savedRecipes.filter(recipe => recipe.id !== id);
  localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
};