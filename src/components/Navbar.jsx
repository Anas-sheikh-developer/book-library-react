import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { FavoriteContext } from '../context/FavoriteContext';

const Navbar = ({ theme, toggleTheme }) => {
  const { favorites } = useContext(FavoriteContext);

  return (
    <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-white'} px-4 py-3 shadow-sm sticky-top`}>
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" to="/">
          <span style={{ fontSize: '1.5rem' }}></span> 
          <span>My<span className="text-primary">Library</span></span>
        </Link>
        
        <div className="d-flex align-items-center gap-3">
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'} btn-sm rounded-pill px-3 fw-medium`}
          >
            {theme === 'dark' ? 'Light' : ' Dark'}
          </button>
          
          {/* Navigation Links */}
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "nav-link fw-bold text-primary" : "nav-link fw-medium text-secondary"}
          >
            Home
          </NavLink>
          
          {/* Favorites Button with Badge */}
          <Link 
            to="/favorites" 
            className={`btn ${theme === 'dark' ? 'btn-danger' : 'btn-outline-danger'} btn-sm rounded-pill px-3 position-relative fw-medium`}
          >
             Favorites
            {favorites.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light">
                {favorites.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;