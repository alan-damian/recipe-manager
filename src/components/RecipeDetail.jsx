import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { saveRecipe } from '../localStorage';
import recipenotfound from '../assets/recipeNotFound.jpeg';
import './RecipeDetailModule.css';
import Recommended from './Recommended';

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = useSelector((state) => state.recipes.recipes.find(recipe => recipe.id === parseInt(id)));
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(true);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        console.log('Realizando solicitud a la API...');
        if (!recipe) {
          const recipeResponse = await axios.get(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=78a1b697d08d49079386d8f2a90ec0b4`
          );
          setRecipeDetails(recipeResponse.data);
          console.log('Variable recipeDetails actualizada:', recipeResponse.data);
        } else {
          setRecipeDetails(recipe);
          console.log('Variable recipeDetails actualizada:', recipe);
        }

        const ingredientsResponse = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=78a1b697d08d49079386d8f2a90ec0b4`
        );
        setIngredients(ingredientsResponse.data.ingredients);
        console.log('Ingredientes obtenidos:', ingredientsResponse.data.ingredients);
      } catch (err) {
        console.error('Error al realizar la solicitud a la API:', err);
        setError(`${err} Error al cargar los datos de la receta`);
      } finally {
        console.log('Solicitud a la API finalizada.');
        setLoading(false);
      }
    };

    fetchRecipeData();
  }, [id, recipe]);

  const handleSaveRecipe = () => {
    const recipeToSave = recipe || recipeDetails;
    if (recipeToSave) {
      saveRecipe(recipeToSave);
      alert('Receta guardada exitosamente!');
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  const recipeToShow = recipe || recipeDetails;
  if (!recipeToShow) return <div className="text-danger">Recipe not found.</div>;

  return (
    <div className="container-fluid my-4" id='detailCont'>
      <h2 className="text-center">{recipeToShow.title}</h2>
      <div className="row mt-4">
        <div className="col-md-4">
          <img
            style={{ width: '100%', height: 'auto' }}
            className="img-fluid rounded mx-auto d-block"
            src={imageLoaded ? recipeToShow.image : recipenotfound}
            alt={recipeToShow.title}
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
        <Link to="/" className="btn btn-primary">Return</Link>
        <button className="btn btn-success" onClick={handleSaveRecipe}>To Save</button>
      </div>
      <Recommended />
    </div>
  );
};

export default RecipeDetail;