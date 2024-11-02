// src/components/RecipeList.jsx
import { useSelector, useDispatch } from 'react-redux';
import { removeRecipe } from '../redux/reducers/recipesReducer';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const RecipeList = () => {
  const { recipes, loading, error } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  
  const handleDelete = (id) => {
    dispatch(removeRecipe(id));
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
          <div key={recipe.id} className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-success">{recipe.title}</h5>
                <Link to={`/recipe/${recipe.id}`} className="btn btn-info me-2">Details</Link>
                <button 
                  className="btn btn-danger" 
                  onClick={() => handleDelete(recipe.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;