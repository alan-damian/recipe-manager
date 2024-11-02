// src/components/SavedList.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSavedRecipes, removeRecipe } from '../localStorage';
import { addRecipe, removeRecipe as removeReduxRecipe } from '../redux/reducers/recipesReducer';
import recipenotfound from '../assets/recipeNotFound.jpeg';
import './SavedList.css'; // Asegúrate de crear este archivo CSS

const SavedList = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [imageLoaded, setImageLoaded] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      const recipes = await getSavedRecipes();
      setSavedRecipes(recipes);
      recipes.forEach(recipe => dispatch(addRecipe(recipe)));
    };

    fetchSavedRecipes();
  }, [dispatch]);

  const handleRemoveRecipe = (id) => {
    removeRecipe(id); 
    dispatch(removeReduxRecipe(id)); 
    setSavedRecipes(savedRecipes.filter(recipe => recipe.id !== id));
    alert('Recipe deleted!');
  };

  const handleImageError = (recipeId) => {
    setImageLoaded(prev => ({
      ...prev,
      [recipeId]: false
    }));
  };

  return (
    <div className="container">
      <h2>Recetas Guardadas</h2>
      <div className="row">
        {savedRecipes.length === 0 ? (
          <p>No recipes here.</p>
        ) : (
          savedRecipes.map(recipe => (
            <div key={recipe.id} className="col-md-4 mb-4">
              <div className="card shadow-sm card-hover">
                <img
                  src={imageLoaded[recipe.id] !== false ? recipe.image : recipenotfound}
                  className="card-img-top"
                  alt={recipe.title}
                  onError={() => handleImageError(recipe.id)}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title text-success">{recipe.title}</h5>
                  <Link to={`/recipe/${recipe.id}`} className="btn btn-primary me-2">
                    Show details
                  </Link>
                  <button
                    onClick={() => handleRemoveRecipe(recipe.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedList;