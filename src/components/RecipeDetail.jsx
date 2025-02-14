import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addRecipe } from '../redux/reducers/recipesReducer';
import recipenotfound from '../assets/recipeNotFound.jpeg';
import './RecipeDetailModule.css';

const RecipeDetail = ({ recipe }) => {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        if (!recipe) {
          const recipeResponse = await axios.get(
            `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=78a1b697d08d49079386d8f2a90ec0b4`
          );
          setRecipeDetails(recipeResponse.data);
        } else {
          setRecipeDetails(recipe);
        }

        const ingredientsResponse = await axios.get(
          `https://api.spoonacular.com/recipes/${recipe.id}/ingredientWidget.json?apiKey=78a1b697d08d49079386d8f2a90ec0b4`
        );
        setIngredients(ingredientsResponse.data.ingredients);
      } catch (err) {
        setError(`${err} Error al cargar los datos de la receta`);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeData();
  }, [recipe]);

  const handleSaveRecipe = () => {
    if (recipe) {
      dispatch(addRecipe(recipe));
      alert('Receta guardada exitosamente!');
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  const recipeToShow = recipeDetails || recipe;
  if (!recipeToShow) return <div className="text-danger">Recipe not found.</div>;

  return (
    <div className="container-fluid" id='detailCont'>
      <div className="row mt-4">
        <div className="col-md-4">
          <img
            style={{ width: '100%', height: 'auto' }}
            className="img-fluid rounded mx-auto d-block"
            src={imageLoaded ? recipe.image : recipenotfound}
            alt={recipe.title}
            onError={() => setImageLoaded(false)}
          />
        </div>
        <div className="col-md-6">
          <section>
            <h3>Ingredientes</h3>
            {ingredients.length > 0 ? (
              <ul className="list-group">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="list-group-item">
                    {ingredient.amount.metric.value} {ingredient.amount.metric.unit} {ingredient.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No ingredients for this one.</p>
            )}
          </section>
        </div>
      </div>
      <div className="d-flex justify-content-around mt-4">
        <button className="btn btn-success" onClick={handleSaveRecipe}>
          To Save
        </button>
      </div>
    </div>
  );
};

RecipeDetail.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired
};

export default RecipeDetail;
