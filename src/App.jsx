// src/App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchRecipes from './components/SearchRecipes';
// import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import SavedList from './components/SavedList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/darkMode.css';
import './App.css';
import Info from './components/Info';


function App() {
  return (
    <BrowserRouter basename="/recipe-manager">
      <div className="app-container"> {/* Cambia el nombre de la clase */}
        <Navbar />
        <main className="main-content"> {/* Cambia el nombre de la clase */}
          <Routes>
            <Route path="/" element={<SearchRecipes />} />
            <Route path="/saved" element={<SavedList />} />
            <Route path="/info" element={<Info />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;