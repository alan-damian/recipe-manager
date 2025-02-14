import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { removeRecipe } from '../redux/reducers/recipesReducer';
import RecipeDetail from './RecipeDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

const RecipeList = ({ recipes }) => {
  const dispatch = useDispatch();
  const [showDetailsId, setShowDetailsId] = useState(null);

  const handleDelete = (id) => {
    dispatch(removeRecipe(id));
  };

  const toggleDetails = (id) => {
    setShowDetailsId(showDetailsId === id ? null : id);
  };

  if (!recipes || recipes.length === 0) {
    return <div className="text-center my-4">No recipes found.</div>;
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

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string,
    })
  ).isRequired,
};

export default RecipeList;
