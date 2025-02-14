// src/components/SavedList.jsx
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeRecipe } from '../redux/reducers/recipesReducer';
import RecipeDetail from './RecipeDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SavedList.css'; // Asegúrate de crear este archivo CSS

const SavedList = () => {
  const { recipes, loading, error } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const [showDetailsId, setShowDetailsId] = useState(null);
  const handleDelete = (id) => {
    dispatch(removeRecipe(id));
  };

  const toggleDetails = (id) => {
    setShowDetailsId(showDetailsId === id ? null : id);
  };



  if (loading) {
    return <div className="text-center my-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger my-4">Error: {error}</div>;
  }

  return (
    <div className="container my-4">
      <div className="row">
        {recipes.map(recipe => (
          <div key={recipe.id} className="col-md-12 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-success">{recipe.title}</h5>
                <button 
                  className="btn btn-info me-2"
                  onClick={() => toggleDetails(recipe.id)}
                >
                  {showDetailsId === recipe.id ? 'Hide Details' : 'Details'}
                </button>
                <button 
                  className="btn btn-danger" 
                  onClick={() => handleDelete(recipe.id)}
                >
                  Delete
                </button>
                
                {showDetailsId === recipe.id && (
                  <div className="mt-3">
                    <RecipeDetail recipe={recipe} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedList;