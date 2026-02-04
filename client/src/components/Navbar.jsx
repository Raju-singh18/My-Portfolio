import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const Navbar = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetchProfile();
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.PROFILE);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const isActive = (path) => location.pathname === path;

  // Determine if we should use dark or light navbar based on page
  const shouldUseDarkNavbar = location.pathname !== '/' || isScrolled;

  return (
    <nav className={`navbar navbar-expand-lg fixed-top transition-all ${
      shouldUseDarkNavbar ? 'navbar-dark bg-dark shadow-lg' : 'navbar-dark bg-transparent'
    }`} style={{ transition: 'all 0.3s ease' }}>
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/">
          <span className="text-warning">{profile?.fullName?.split(' ')[0] || 'Portfolio'}</span>
          <span className="text-light">.dev</span>
        </Link>
        
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 py-2 mx-1 rounded ${isActive('/') ? 'active bg-warning text-dark fw-semibold' : shouldUseDarkNavbar ? 'text-light' : 'text-light'}`} 
                to="/"
              >
                <i className="fas fa-home me-2"></i>Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 py-2 mx-1 rounded ${isActive('/about') ? 'active bg-warning text-dark fw-semibold' : shouldUseDarkNavbar ? 'text-light' : 'text-light'}`} 
                to="/about"
              >
                <i className="fas fa-user me-2"></i>About
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 py-2 mx-1 rounded ${isActive('/skills') ? 'active bg-warning text-dark fw-semibold' : shouldUseDarkNavbar ? 'text-light' : 'text-light'}`} 
                to="/skills"
              >
                <i className="fas fa-cogs me-2"></i>Skills
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 py-2 mx-1 rounded ${isActive('/experience') ? 'active bg-warning text-dark fw-semibold' : shouldUseDarkNavbar ? 'text-light' : 'text-light'}`} 
                to="/experience"
              >
                <i className="fas fa-briefcase me-2"></i>Experience
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 py-2 mx-1 rounded ${isActive('/projects') ? 'active bg-warning text-dark fw-semibold' : shouldUseDarkNavbar ? 'text-light' : 'text-light'}`} 
                to="/projects"
              >
                <i className="fas fa-rocket me-2"></i>Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 py-2 mx-1 rounded ${isActive('/blog') ? 'active bg-warning text-dark fw-semibold' : shouldUseDarkNavbar ? 'text-light' : 'text-light'}`} 
                to="/blog"
              >
                <i className="fas fa-blog me-2"></i>Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 py-2 mx-1 rounded ${isActive('/contact') ? 'active bg-warning text-dark fw-semibold' : shouldUseDarkNavbar ? 'text-light' : 'text-light'}`} 
                to="/contact"
              >
                <i className="fas fa-envelope me-2"></i>Contact
              </Link>
            </li>
            {user && user.email && (
              <li className="nav-item">
                <Link 
                  className="nav-link px-3 py-2 mx-1 rounded bg-success text-white fw-semibold" 
                  to="/admin/dashboard"
                >
                  <i className="fas fa-tachometer-alt me-2"></i>Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar
