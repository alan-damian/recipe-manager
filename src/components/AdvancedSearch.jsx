// src/components/AdvancedSearch.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRecipes } from '../redux/actions/recipeActions';
import './AdvancedSearchModule.css';

const AdvancedSearch = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    query: '',
    cuisine: '',
    diet: '',
    intolerances: '',
    maxReadyTime: '',
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    dispatch(fetchRecipes(params.toString()));
  };

  return (
    <div className="advanced-search-container">
      <div className="advanced-search-grid">
        <div className="search-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search recipes..."
            value={filters.query}
            onChange={(e) => setFilters({...filters, query: e.target.value})}
          />
        </div>

        <div className="search-group">
          <select
            className="form-control"
            value={filters.cuisine}
            onChange={(e) => setFilters({...filters, cuisine: e.target.value})}
          >
            <option value="">Select cuisine</option>
            <option value="italian">Italian</option>
            <option value="mexican">Mexican</option>
            <option value="asian">Asian</option>
            <option value="mediterranean">Mediterranean</option>
            <option value="american">American</option>
            <option value="thai">Thai</option>
            <option value="indian">Indian</option>
            <option value="japanese">japanese</option>
          </select>
        </div>

        <div className="search-group">
          <select
            className="form-control"
            value={filters.diet}
            onChange={(e) => setFilters({...filters, diet: e.target.value})}
          >
            <option value="">Select Diet</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten-Free</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="paleo">Paleo</option>
            <option value="pescetarian">Pescetarian</option>
          </select>
        </div>

        <div className="search-group">
          <select
            className="form-control"
            value={filters.intolerances}
            onChange={(e) => setFilters({...filters, intolerances: e.target.value})}
          >
            <option value="">Seleccionar intolerancia</option>
            <option value="dairy">Dairy</option>
            <option value="egg">Egg</option>
            <option value="gluten">Gluten</option>
            <option value="peanut">Peanut</option>
            <option value="seafood">Seafood</option>
          </select>
        </div>

        <div className="search-group">
          <input
            type="number"
            className="form-control"
            placeholder="Max time (min)"
            value={filters.maxReadyTime}
            onChange={(e) => setFilters({...filters, maxReadyTime: e.target.value})}
          />
        </div>

        <div className="search-group">
          <button className="btn btn-primary w-100" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;