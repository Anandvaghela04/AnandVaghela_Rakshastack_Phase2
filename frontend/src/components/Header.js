import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Plus, Home, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const location = useLocation();
  const { theme, toggleTheme, isDark } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo Section */}
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            <div className="logo-icon">
              <ShoppingBag size={28} />
            </div>
            <div className="logo-text">
              <span className="logo-title">E-Commerce</span>
              <span className="logo-subtitle">Product Store</span>
            </div>
          </Link>

          {/* Navigation and Actions Section */}
          <div className="nav-section">
            <nav className="desktop-nav">
              <ul className="nav-links">
                <li>
                  <Link
                    to="/"
                    className={`nav-link ${isActive('/') || isActive('/products') ? 'active' : ''}`}
                  >
                    <Home size={20} />
                    <span>Products</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create"
                    className={`nav-link ${isActive('/create') ? 'active' : ''}`}
                  >
                    <Plus size={20} />
                    <span>Add Product</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={toggleTheme}
                    className="theme-toggle-btn"
                    aria-label="Toggle theme"
                  >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                </li>
              </ul>
            </nav>

            <button
              className="mobile-menu-btn"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className={`mobile-nav ${isMobileMenuOpen ? 'mobile-nav-open' : ''}`}>
          <ul className="mobile-nav-links">
            <li>
              <Link
                to="/"
                className={`mobile-nav-link ${isActive('/') || isActive('/products') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <Home size={20} />
                <span>Products</span>
              </Link>
            </li>
            <li>
              <Link
                to="/create"
                className={`mobile-nav-link ${isActive('/create') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <Plus size={20} />
                <span>Add Product</span>
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  toggleTheme();
                  closeMobileMenu();
                }}
                className="mobile-theme-toggle"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
