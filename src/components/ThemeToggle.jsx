// src/components/ThemeToggle.jsx
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
  
    return (
      <button 
        onClick={toggleTheme}
        className={`btn ${theme === 'dark' ? 'btn-light' : 'btn-dark'}`}
        style={{ margin: '0 10px' }}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    );
  };
  
  export default ThemeToggle;