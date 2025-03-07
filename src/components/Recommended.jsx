// src/components/Recommended.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import recipenotfound from '../assets/recipeNotFound.jpeg';
import RecipeDetail from './RecipeDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

const Recommended = () => {
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({});
  const [showDetailsId, setShowDetailsId] = useState(null);

  useEffect(() => {
    const fetchRecommendedRecipes = async () => {
      try {
        const response = await axios.get('https://api.spoonacular.com/recipes/random?number=9&apiKey=78a1b697d08d49079386d8f2a90ec0b4');
        setRecommendedRecipes(response.data.recipes);
      } catch (error) {
        setError(`${error}Error fetching recommended recipes`);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedRecipes();
  }, []);

  const handleImageError = (recipeId) => {
    setImageLoaded(prev => ({
      ...prev,
      [recipeId]: false
    }));
  };

  const toggleDetails = (id) => {
    setShowDetailsId(showDetailsId === id ? null : id);
  };

  if (loading) {
    return <div className="text-center my-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger my-4">{error}</div>;
  }

  return (
    <div className="container my-4" id='recommended-container'>
      <h2>Recommended Recipes</h2>
      <div className="row" id='recommended-grid'>
        {recommendedRecipes.length === 0 ? (
          <p>No recommended recipes available.</p>
        ) : (
          recommendedRecipes.map(recipe => (
            <div key={recipe.id} className="col-md-4 mb-4" id='recommended-item'>
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
                  <button 
                    className="btn btn-info me-2"
                    onClick={() => toggleDetails(recipe.id)}
                  >
                    {showDetailsId === recipe.id ? 'Hide Details' : 'Details'}
                  </button>
                  {showDetailsId === recipe.id && (
                    <div className="mt-3">
                      <RecipeDetail recipe={recipe} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Recommended;