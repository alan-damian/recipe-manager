// src/components/IngredientSearch.jsx
import { useState } from 'react';
import axios from 'axios';

const IngredientSearch = () => {
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState([]);

  const addIngredient = () => {
    if (inputValue && !ingredients.includes(inputValue)) {
      setIngredients([...ingredients, inputValue]);
      setInputValue('');
    }
  };

  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const searchByIngredients = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients`,
        {
          params: {
            apiKey: '78a1b697d08d49079386d8f2a90ec0b4',
            ingredients: ingredients.join(','),
            number: 10,
            ranking: 2,
            ignorePantry: true
          }
        }
      );
      setResults(response.data);
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  };

  return (
    <div className="ingredient-search">
      <div className="ingredient-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Añade un ingrediente"
        />
        <button onClick={addIngredient}>Añadir</button>
      </div>
      
      <div className="ingredients-list">
        {ingredients.map(ingredient => (
          <span key={ingredient} className="ingredient-tag">
            {ingredient}
            <button onClick={() => removeIngredient(ingredient)}>×</button>
          </span>
        ))}
      </div>

      {ingredients.length > 0 && (
        <button onClick={searchByIngredients}>
          Buscar Recetas
        </button>
      )}

      <div className="results">
        {results.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
            <p>Ingredientes usados: {recipe.usedIngredientCount}</p>
            <p>Ingredientes faltantes: {recipe.missedIngredientCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientSearch;