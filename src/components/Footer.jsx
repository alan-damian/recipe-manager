// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaFolderOpen , FaLinkedin } from 'react-icons/fa';
import './FooterModule.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          {/* Columna de Redes Sociales */}
          <div className="col-md-4 mb-3">
            <h5 className="mb-3">More </h5>
            <div className="social-links">
              <a  target="_blank" rel="noopener noreferrer" className="text-light me-3">
                <FaFacebook size={24} />
              </a>
              <a  target="_blank" rel="noopener noreferrer" className="text-light me-3">
                <FaTwitter size={24} />
              </a>
              <a href="https://alan-damian.github.io/vcard-personal-portfolio-master/" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                👌<FaFolderOpen  size={24} />
              </a>
              <a href="https://www.linkedin.com/in/alan-barragan-c/" target="_blank" rel="noopener noreferrer" className="text-light">
                👌<FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Columna de Links */}
          <div className="col-md-4 mb-3">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/recipe-manager" className="text-light text-decoration-none">Search</Link>
              </li>
              <li className="mb-2">
                <Link to="/recipe-manager/saved" className="text-light text-decoration-none">Saved Recipes</Link>
              </li>
              <li className="mb-2">
                <Link to="/recipe-manager/info" className="text-light text-decoration-none">Info</Link>
              </li>
            </ul>
          </div>

          {/* Columna Legal */}
          <div className="col-md-4 mb-3">
            <h5 className="mb-3">Legal</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link  className="text-light text-decoration-none">Privacy Policy</Link>
              </li>
              <li className="mb-2">
                <Link  className="text-light text-decoration-none">Terms of Service</Link>
              </li>
              <li className="mb-2">
                <Link  className="text-light text-decoration-none">Cookies Policy</Link>
              </li>
              <li className="mb-2">
                <Link  className="text-light text-decoration-none">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="row mt-3">
          <div className="col-12 text-center">
            <hr className="bg-light" />
            <p className="mb-0">© {new Date().getFullYear()} Recipe Manager App. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;