// src/components/Navbar.js
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ThemeToggle from './ThemeToggle';
import logo from '../assets/recipeLogonav.png';
import './NavbarModule.css'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/recipe-manager">
          <img src={logo} className="img-fluid me-2" alt="Logo" style={{ width: '40px', height: 'auto' }} />
          <h4 className="mb-0">RECIPE MANAGER</h4>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav me-auto my-2 my-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/recipe-manager">Search</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/recipe-manager/info">Info</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;