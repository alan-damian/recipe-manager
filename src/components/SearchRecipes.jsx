// src/components/SearchRecipes.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRecipes } from '../redux/actions/recipeActions';
import axios from 'axios';
import Downshift from 'downshift';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeList from './RecipeList';
import Recommended from './Recommended';
import AdvancedSearch from './AdvancedSearch';
import './SearchRecipesmodule.css';

const SearchRecipes = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = (searchParams = '') => {
    if (query || searchParams) {
      dispatch(fetchRecipes(searchParams || query));
      fetchRecommendedRecipes();
    }
  };

  const fetchSuggestions = async (value) => {
    if (value) {
      const response = await axios.get(`https://api.spoonacular.com/recipes/autocomplete?query=${value}&number=5&apiKey=78a1b697d08d49079386d8f2a90ec0b4`);
      setSuggestions(response.data);
    }
  };

  const fetchRecommendedRecipes = async () => {
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/random?number=9&apiKey=78a1b697d08d49079386d8f2a90ec0b4`);
      setRecommendedRecipes(response.data.recipes);
    } catch (error) {
      console.error("Error fetching recommended recipes:", error);
    }
  };

  return (
    <div className="my-0" id='container'>
      <Downshift
        onChange={(selectedItem) => setQuery(selectedItem.title)}
        itemToString={(item) => (item ? item.title : '')}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          highlightedIndex,
          selectedItem,
        }) => (
          <div className="position-relative">
            <div className="d-flex justify-content-center mb-4" >
              <div className="input-group" id='searchBar' >
                <input
                  {...getInputProps({
                    className: "form-control",
                    placeholder: 'Search recipes',
                    onChange: (e) => {
                      setQuery(e.target.value);
                      fetchSuggestions(e.target.value);
                    },
                    style: { padding: '10px' },
                  })}
                />
                <button className="btn btn-primary" onClick={() => handleSearch()}>Search</button>
                <button className="btn btn-secondary" onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}>
                  {showAdvancedSearch ? 'Hide Advanced' : 'Advanced Search'}
                </button>
              </div>
            </div>
            {isOpen && suggestions.length > 0 && query.trim() && (
              <div className="dropdown-menu show" id='searchSug'>
                {suggestions.map((item, index) => (
                  <div
                    key={item.id}
                    {...getItemProps({
                      index,
                      item,
                      style: {
                        color: highlightedIndex === index ? ' green' : 'black',
                        backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                        cursor: 'pointer',
                        padding: '10px 15px',
                      },
                    })}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            )}
            {showAdvancedSearch && (
              <AdvancedSearch onSearch={handleSearch} />
            )}
            <RecipeList />
            <section id='recommend'>
              <Recommended recipes={recommendedRecipes} />
            </section>
          </div>
        )}
      </Downshift>
    </div>
  );
};

export default SearchRecipes;